import express from 'express'
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config()

const app = express()
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev': 'common'))

app.get('/static', (req, res) => {
  const {} = req.query;
  res.send('Gradient Generator Static image providing server')
})

app.listen(process.env.STATIC_SERVER_PORT,() => {
  console.log(`Server is running at ${process.env.STATIC_SERVER_PORT}`)
})

