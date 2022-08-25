import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
dotenv.config()

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(404).json({ message: 'User already exisit!' })
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password doesn't match!" })
    }
    const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUND)
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET_KEY,
      {
        expiresIn: '24h'
      }
    )
    res.status(201).json({ user, token })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const findUser = await User.findOne({ email })

    if (!findUser) {
      return res.status(404).json({ message: 'No user found!' })
    }

    const confirmPassword = await bcrypt.compare(password, findUser.password)

    if (!confirmPassword) {
      return res.status(401).json({ message: 'invalid credentials' })
    }

    const token = jwt.sign(
      { email: findUser.email, id: findUser._id },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    )
    res.status(200).json({ data: findUser, token })
  } catch (error) {
    res.statu(500).json({ message: 'Internal Server Error' })
  }
}
