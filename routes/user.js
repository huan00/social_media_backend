import express from 'express'
import { signUp } from '../controllers/user.js'

const router = express.Router()

// router.get('/', (req, res) => res.send('hello'))
router.post('/signup', signUp)

export default router
