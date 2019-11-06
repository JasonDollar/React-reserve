import mongoose from 'mongoose'
import validator from 'validator'
// import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: val => validator.isEmail(val),
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin', 'root'],
  },
}, {
  timestamps: true,
})

// userSchema.pre('save', function (next) {
//   next()
// })

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User