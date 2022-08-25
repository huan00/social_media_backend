import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from './routes/user.js'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const PORT = 3003

const app = express()
app.use(cors())

app.use('/user', userRoutes)

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
