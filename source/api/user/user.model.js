const HttpStatus = require('http-status')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { ValidationError } = require('../../util/errors')
const config = require('../../config')
const { roles } = require('../../services/auth')

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
  role: {
    type: String,
    enum: roles,
    default: 'user',
  },
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
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
  // Unique constraint error.
  if (err.name === 'MongoError' && err.code === 11000) {
    return next(new ValidationError({
      status: HttpStatus.CONFLICT,
      errors: [{
        field: ['email'],
        location: 'body',
        messages: ['User already exists.'],
      }],
    }))
  } else if (err.name === 'ValidationError') {
    return next(new ValidationError({
      status: HttpStatus.BAD_REQUEST,
      errors: [{
        field: ['email'],
        location: 'body',
        messages: [err.message],
      }],
    }))
  }
  return next(err)
})

UserSchema.methods = {
  /**
   * Creates a JWT authentication token.
   * @returns {string} The authentication token
   */
  async createToken() {
    const token = await jwt.sign(
      this.toPublic(),
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn },
    )
    return token
  },

  /**
   * Checks whether the provided password is valid.
   * @param {string} rawPassword The raw password
   * @returns {Boolean} whether the password is valid.
   */
  async isValidPassword(rawPassword) {
    const isValid = await bcrypt.compare(rawPassword, this.password)
    return isValid
  },

  /**
   * Returns a user object containing only publicly viewable properties.
   * @returns {Object} The new user object
   */
  toPublic() {
    const publicUser = {}
    const fields = ['id', 'email', 'role', 'firstName', 'lastName', 'createdAt', 'updatedAt']

    fields.forEach(field => {
      publicUser[field] = this[field]
    })

    return publicUser
  },
}

mongoose.model('User', UserSchema)


module.exports = mongoose.model('User')
