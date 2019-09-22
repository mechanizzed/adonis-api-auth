'use strict'

const crypto = require('crypto')
const User = use('App/Models/User')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)
      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()
      await user.save()
      return response.send({ message: 'Message OK' })
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: true, message: 'Error message' })
    }
  }
}

module.exports = ForgotPasswordController
