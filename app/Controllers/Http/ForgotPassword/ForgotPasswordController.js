'use strict'

const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)
      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()
      const update = await user.save()

      if (update) {
        await Mail.send(
          ['emails.forgot_password'],
          {
            email,
            token: user.token,
            link_to_front: `${request.input('redirect_url')}?token=${
              user.token
            }`
          },
          message => {
            message
              .to(user.email)
              .from('api@email.com', 'JWT Auth with AdonisJS')
              .subject('Forgot password')
          }
        )
      }

      return response.send({ message: 'Message OK' })
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: true, message: 'Error message' })
    }
  }
}

module.exports = ForgotPasswordController
