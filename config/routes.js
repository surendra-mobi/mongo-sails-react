/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

	'/': { view: 'pages/homepage' },
	/*   patient login/signup      */
	'post /user/signup': { action: 'user/signup' },
	'post /user/update': { action: 'user/updateProfile' },
	'post /user/login': { action: 'user/login' },
	'post /user/forgot': { action: 'user/forgotPassword' },
	'post /user/reset-password': { action: 'user/resetPasswordByResetToken' },
	'post /user/change-password': { action: 'user/changePassword'},
	'post /user/update/:id': { action: 'user/update' },
	'get /user/:id': { action: 'user/get' },
        'get /user': { action: 'user/getUserDetails' },

	
	/*   admin manage-users      */
	'post /admin/user/create': { action: 'user/create' },
	'post /admin/user/update/:id': { action: 'user/update' },
	'post /admin/user/delete/:id': { action: 'user/deleteM' },
	'get /admin/user/getall': { action: 'user/getAllUsers' },
	'get /admin/user/:id': { action: 'user/get' },
	
         /*   admin manage-provider      */
	'post /admin/provider': { action: 'providers/create' },
	'put /admin/provider': { action: 'providers/update' },
	'delete /admin/provider/:id': { action: 'providers/delete' },
	'get /admin/provider': { action: 'providers/getAllProviders' },
	'get /admin/provider/:id': { action: 'providers/geProviderByID' },
	'get /admin/provider/list': { action: 'providers/getAllProviders' },
	'post /admin/provider/practiceDetails': { action: 'providers/addPracticeDetails'},
        'put /admin/provider/practiceDetails': { action: 'providers/updatePracticeDetails'},
	
	 
	 /*   admin manage-appointments      */	 
	'get /appointments':   { action: 'appointment/getAll'},
	'post /appointments': { action: 'appointment/book' },
	'get /appointment/list': { action: 'appointment/list' },
	
	/*swagger*/
	'get /docs': { action: 'sagger/docs' },

	//'get /docs': { action: 'swagger/index' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
