import { makeKey, createSession, getSession } from './component/mango';
import { Request, Response, NextFunction } from 'express';
import express from 'express';
const path = require('path');
const app = express();
const port = process.env.PORT || 3000

app.set('trust proxy', true);
app.use(express.static(path.join(__dirname, 'pages')));

app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/pages/welcome.html')
})

app.get('/make-key', (req, res) => {
    console.log(process.env.ENV)
    makeKey(String(req.headers.email)).then((key) => {
      if (key === "Key already exists for this email") {
        res.status(400).json({error: key})
      }
      res.status(200).json({email: String(req.headers.email), key: key})
    }).catch((e) => {
      res.status(500).json({error: e})
    })
})

app.get('/favicon.ico', (req, res) => {
  res.status(200).sendFile(__dirname + '/pages/favicon.ico')
})

app.post('/create-session', (req, res) => {
  createSession(req.ip).then((session) => {
    res.status(200).json({id: session.id})
  }).catch((e) => {
    console.error(e)
    res.status(500).json({error: "There was an error creating the session"})
  })
})

const needSessionId = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers) {
    res.status(400).json({error: 'No header'})
  } else if (!req.headers.id) {
    res.status(400).json({error: 'No session id provided'})
  } else if (typeof req.headers.id !== 'string') {
    res.status(400).json({error: 'Session id is not a string'})
  } else {
    next()
  }
}

app.get('/session', needSessionId, (req, res) => {
  getSession(String(req.headers.id)).then((session) => {
    if (session === null) {
      res.status(409).json({error: "Session id was not found"})
    } else {
      res.status(200).json({id: session.id})
    }
  })
})



app.listen(`${port}`, () => {
  console.log(`App is listening on port ${port}`)
})

