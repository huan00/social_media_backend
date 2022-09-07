import express from 'express'

import {
  getPosts,
  createPost,
  likePost,
  deletePost,
  updatePost,
  getSearchPosts
} from '../controllers/post.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/search', getSearchPosts)
router.post('/', createPost)
router.put('/:id/likepost', auth, likePost)
router.put('/:id/updatepost', auth, updatePost)
router.delete('/:id/deletepost', auth, deletePost)

export default router
