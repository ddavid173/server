import { makeKey } from './component/mango';
import { Request, Response, NextFunction } from 'express';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000

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

app.get('/style.css', (req, res) => {
  res.status(200).sendFile(__dirname + '/pages/style.css')
})

app.get('/favicon.ico', (req, res) => {
  res.status(200).sendFile(__dirname + '/img/favicon.ico')
})

app.listen(`${port}`, () => {
  console.log(`App is listening on port ${port}`)
})

