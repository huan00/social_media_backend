import express from 'express'
import { signUp, signIn } from '../controllers/user.js'

const router = express.Router()

// router.get('/', (req, res) => res.send('hello'))
router.post('/signup', signUp)
router.post('/signin', signIn)

export default router
