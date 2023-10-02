import { makeKey, createSession } from './component/mango';
import { Request, Response, NextFunction } from 'express';
import express from 'express';
const path = require('path');

const app = express();
const port = process.env.PORT || 3000
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

app.get('/style.css', (req, res) => {
  res.status(200).sendFile(__dirname + '/pages/style.css')
})

app.get('/scripts.css', (req, res) => {
  res.status(200).sendFile(__dirname + '/pages/scripts.js')
})

app.get('/favicon.ico', (req, res) => {
  res.status(200).sendFile(__dirname + '/img/favicon.ico')
})

app.get('/create-session', (req, res) => {
  createSession(req.ip).then((session) => {
    res.status(200).json(session)
  }).catch((e) => {
    console.error(e)
    res.status(500).json({error: "There was an error creating the session"})
  })
})

app.get('/check-session', (req, res) => {
  // TODO: Check session
})

app.listen(`${port}`, () => {
  console.log(`App is listening on port ${port}`)
})

