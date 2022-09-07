import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRoutes from './routes/user.js'
import postRoutes from './routes/post.js'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const PORT = 3003

const app = express()
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/user', userRoutes)
app.use('/post', postRoutes)

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
