import App from 'bunrest'
const server = App();
const port = 3000

server.get('/', (req, res) => {
  res.status(200).send("It worked")
})

server.get('/favicon.ico', (req, res) => {
  res.status(400).json({error: 'No favicon avalible'})
})

server.listen(`${port}`, () => {
  console.log(`App is listening on port ${port}`)
})

