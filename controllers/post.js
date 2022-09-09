import PostMessage from '../models/post.js'
import mongoose from 'mongoose'

export const createPost = async (req, res) => {
  const post = req.body
  const createdPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString()
  })

  try {
    await createdPost.save()
    res.status(201).json(createdPost)
  } catch (error) {
    res.status(400).json(error)
  }
}
export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find({}).sort({ _id: -1 })
    if (!posts) {
      res.status(502).json({ message: 'No Post found!' })
    }
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const getAPost = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json({ message: 'invalid ID' })
  }

  const post = await PostMessage.findById(id)
  console.log(post)
  res.status(200).json(post)
}

export const likePost = async (req, res) => {
  const { id } = req.params

  if (!req.userId) return res.status(401).json({ message: 'please sign in' })

  const post = await PostMessage.findById(id)

  if (!mongoose.Types.ObjectId.isValid(id) || !post) {
    return res.status(404).json('invalid post ID')
  }

  const index = post.likes.findIndex((id) => id === String(req.userId))

  if (index === -1) {
    post.likes.push(req.userId)
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId))
  }

  const updatedLikePost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true
  })
  res.status(202).json(updatedLikePost)
}

export const deletePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: 'invalid Id' })
  }
  await PostMessage.findByIdAndRemove(id)
  res.status(202).json({ message: 'Post deleted successfully' })
}

export const updatePost = async (req, res) => {
  const { id } = req.params
  const pendingPost = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: 'invalid Id' })
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, pendingPost, {
    new: true
  })

  res.status(202).json(updatedPost)
}

export const getSearchPosts = async (req, res) => {
  const { searchQuery, tags } = req.query

  try {
    const title = new RegExp(searchQuery, 'i')
    const findPosts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }]
    })
    console.log(findPosts)
    res.json(findPosts)
  } catch (error) {
    res.status(404).json({ message: 'No feeds found' })
  }
}

export const submitComment = async (req, res) => {
  const { id } = req.params
  const { comment } = req.body

  const post = await PostMessage.findById(id)
  post.comments.push(comment)
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true
  })
  res.status(202).json(updatedPost)
}
