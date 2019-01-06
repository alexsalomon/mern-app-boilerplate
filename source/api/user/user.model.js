const HttpStatus = require('http-status')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const APIError = require('../../services/errors/api.error')
const config = require('../../config')

// Roles in order of importance
const roles = ['admin', 'user']

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required.'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
}, { timestamps: true })

UserSchema.pre('save', async function hashPassword(done) {
  if (this.isModified('password')) {
    const hashedPassword = await bcrypt.hash(this.password, config.jwt.saltRounds)
    this.password = hashedPassword
  }
  return done()
})

UserSchema.post('save', (err, doc, next) => {
  if (err.name === 'MongoError' && err.code === 11000) { // Unique constraint error.
    return next(new APIError({ status: HttpStatus.BAD_REQUEST, message: 'User already exists.' }))
  } else if (err.name === 'ValidationError') {
    return next(new APIError({ status: HttpStatus.BAD_REQUEST, message: err.message }))
  }
  return next(err)
})

UserSchema.methods = {
  async isPasswordValid(rawPassword) {
    const isValid = await bcrypt.compare(rawPassword, this.password)
    return isValid
  },
}

UserSchema.statics = {
  roles,
}

mongoose.model('User', UserSchema)

module.exports = mongoose.model('User')
