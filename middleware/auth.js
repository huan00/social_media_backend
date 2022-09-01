import jwt from 'jsonwebtoken'
dotenv.config()

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authroization.split(' ')[1]
    const isCustomAuth = token.length < 500
    let decodedData

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.SECRET_Key)

      req.userId = decodedData?.id
    } else {
      decodedData = jwt.decode(token)
      req.userId = decodedData?.sub
    }
    next()
  } catch (error) {
    console.log(error)
  }
}

export default auth
