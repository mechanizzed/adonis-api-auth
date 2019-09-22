'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/**
 * Users
 */
Route.group(() => {
  Route.post('user/create', 'User/UserController.store')
})
