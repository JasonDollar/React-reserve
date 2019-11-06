import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
  const { name, email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      return res.status(422).send('User already exists with that email')
    }
    const hash = await bcrypt.hash(password, 12)

    const newUser = await new User({ name, email, password: hash }).save()

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '10d' })
    res.status(201).json(token)
  } catch (e) {
    console.error(e)
    res.status(500).send('Error signup user. Please try again later')
  }
}