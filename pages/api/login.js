import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(404).send('User not found')
    }
    const isPasswordMatch = await await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(401).send('Wrong email or password')
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '10d' })
    res.status(200).json(token)
  } catch (e) {
    console.error(e)
    res.status(500).send('Error login user. Please try again later')
  }
}