/**
 * Provides.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
                fromPatient:{model:"User"},
                toProvider:{model:"Provider"},
                appointmentId:{model:"Appointment"},
                rating: {
			type: "string",
			allowNull: false
		},
		message: {
			type: "string",
			allowNull: false
		},
		status: {
			type: "number",
			allowNull: true
		}
  }
 
 };

