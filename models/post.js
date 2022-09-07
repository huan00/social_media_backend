import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  title: { type: String, require: true },
  message: { type: String, require: true },
  name: { type: String, require: true },
  creator: { type: String, require: true },
  tags: { type: [String] },
  selectedFile: { type: String },
  likes: {
    type: [String],
    default: []
  },
  comments: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date() }
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage
