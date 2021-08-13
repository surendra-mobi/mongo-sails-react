/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */
const swaggerUi = require('swagger-ui-express');


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  'UserController': {
    create: ['isAuthenticated'],
    update: ['isAuthenticated'],
    getAllUsers: ['isAuthenticated'],
    deleteM: ['isAuthenticated'],
    getUserDetails: ['isAuthenticated'],
    updateProfile:['isAuthenticated'],
  },
  'ProvidersController': {
    create: ['isAuthenticated'],
    update: ['isAuthenticated'],
    getAllUsers: ['isAuthenticated'],
    deleteM: ['isAuthenticated'],
    addPracticeDetails: ['isAuthenticated'],
    getAllProviders:['isAuthenticated'],
    geProviderByID:['isAuthenticated'],
  },
  'AppointmentController': {
   	book: ["isAuthenticated"],
   	getAll: ["isAuthenticated"],
  },

};
