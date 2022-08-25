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
    console.log(error)
  }
}
