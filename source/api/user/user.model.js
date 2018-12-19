const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const config = require('../../config')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: { validator: validator.isEmail, message: 'Invalid email.' },
  },
  password: {
    type: String,
    required: true,
    minlength: [
      config.auth.password.minLength,
      `Minimum password length is ${config.auth.password.minLength}`,
    ],
    validate: {
      validator(password) {
        return password.length >= config.auth.password.minLength
      },
    },
  },
}, { timestamps: true })

UserSchema.pre('save', async function hashPassword(done) {
  if (this.isModified('password')) {
    const hashedPassword = await bcrypt.hash(this.password, config.auth.saltRounds)
    this.password = hashedPassword
  }
  return done()
})

UserSchema.methods = {
  isPasswordValid(rawPassword) {
    return bcrypt.compare(rawPassword, this.password)
  },
}

mongoose.model('User', UserSchema)

module.exports = mongoose.model('User')
