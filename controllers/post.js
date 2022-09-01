import PostMessage from '../models/post.js'

export const createPost = async (req, res) => {
  const post = req.body
  const createdPost = new PostMessage({
    ...post,
    creator: req.profileId,
    createdAt: new Date().toISOString()
  })

  console.log(req)

  try {
    await createdPost.save()
    res.status(201).json(createdPost)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}
export const getAllPosts = () => {}
