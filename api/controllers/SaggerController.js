/**
 * ControllersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../../assets/docs/swagger.json');

module.exports = {
     docs:swaggerUi.setup(swaggerDocument)
  
};

