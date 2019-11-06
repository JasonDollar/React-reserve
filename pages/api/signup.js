import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { isEmail, isLength } from 'validator'
import User from '../../models/User'
import Cart from '../../models/Cart'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
  const { name, email, password } = req.body
  try {
    // validation
    if (!isLength(name, { min: 3, max: 12 })) {
      return res.status(422).send('Name must be 3-12 characters long')
    } 
    if (!isLength(password, { min: 6 })) {
      return res.status(422).send('Password must be at least 6 characters long')
    }
    if (!isEmail(email)) {
      return res.status(422).send('Email must be valid')
    }
 

    const user = await User.findOne({ email })
    if (user) {
      return res.status(422).send('User already exists with that email')
    }
    const hash = await bcrypt.hash(password, 12)

    const newUser = await new User({ name, email, password: hash }).save()
    await new Cart({ user: newUser._id }).save()

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '10d' })
    res.status(201).json(token)
  } catch (e) {
    console.error(e)
    res.status(500).send('Error signup user. Please try again later')
  }
}