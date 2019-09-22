'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/**
 * Users
 */
Route.group(() => {
  Route.post('user/store', 'User/UserController.store')
})

/**
 * Session
 */
Route.group(() => {
  Route.post('session/store', 'Session/SessionController.store')
})

/**
 * ForgotPassword
 */
Route.group(() => {
  Route.post('password', 'ForgotPassword/ForgotPasswordController.store')
  Route.put('password/update', 'ForgotPassword/ForgotPasswordController.update')
})
