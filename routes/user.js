import express from 'express'
import { signin } from '../controllers/user.js'

const router = express.Router()

// router.get('/', (req, res) => res.send('hello'))
router.post('/signup', signin)

export default router
