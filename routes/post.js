import express from 'express'

import {
  getPosts,
  getAPost,
  createPost,
  likePost,
  deletePost,
  updatePost,
  getSearchPosts,
  submitComment
} from '../controllers/post.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/search', getSearchPosts)
router.get('/:id', auth, getAPost)
router.post('/', auth, createPost)
router.post('/:id/comment', auth, submitComment)
router.put('/:id/likepost', auth, likePost)
router.put('/:id/updatepost', auth, updatePost)
router.delete('/:id/deletepost', auth, deletePost)

export default router
