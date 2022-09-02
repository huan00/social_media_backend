import PostMessage from '../models/post.js'

export const createPost = async (req, res) => {
  const post = req.body
  const createdPost = new PostMessage({
    ...post,
    creator: req.profileId,
    createdAt: new Date().toISOString()
  })

  try {
    await createdPost.save()
    res.status(201).json(createdPost)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}
export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find({})
    if (posts) {
      res.status(200).json(posts)
    }
    res.status(502).json({ message: 'No Post found!' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
