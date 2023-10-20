require('dotenv').config()
const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 5000
const app = express()

const errorMiddleware = require('./src/middleware/error-middleware')
const router = require('./src/router/index')

app.use(express.json());
app.use(cors({
   origin: (_origin, callback) => {
      callback(null, true)
   }
}));

app.use('/api', router)

app.use(errorMiddleware)

const start = async () => {
   try {
      app.listen(PORT, () => console.log(`Server started on ${PORT} port`))
   } catch (e) {
      console.log(e)
   }
}

start()