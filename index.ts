import { makeKey } from './component/mango.ts';
import { Request, Response, NextFunction } from 'express';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000

const needEmail = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers) {
    res.status(501).json({error: 'No header'})
  } else if (!req.headers.email) {
    res.status(502).json({error: 'No email provided'})
  } else if (req.headers.email.toString()) {
    next()
  }
}

app.get('/', (req, res) => {
  res.status(200).send(`Welcome: go to ${process.env.URL}/make-key to get a key. /nplace your email in the header (email: <email>). One key per an email. If you loose your key contact me to get it reset.`)
})

app.get('/make-key', needEmail, (req, res) => {
    makeKey(String(req.headers.email)).then((key) => {
      if (key === "Key already exists for this email") {
        res.status(400).json({error: key})
      }
      res.status(200).json({email: String(req.headers.email), key: key})
    }).catch((e) => {
      res.status(500).json({error: e})
    })
})


app.get('/favicon.ico', (req, res, ) => {
  res.status(400).json({error: 'No favicon avalible'})
})

app.listen(`${port}`, () => {
  console.log(`App is listening on port ${port}`)
})

