/**
 * Provides.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
                provider:{model:"Provider"},
                location:  {
			type: "json",
			allowNull: false
		},
		timezone: {
			type: "string",
			allowNull: false
		},
		break: {
			type: "string",
			allowNull: false
		},
		visitDuration: {
			type: "number",
			allowNull: true
		},
		padding: {
			type: "number",
			allowNull: true
		},
		startDate: {
			type: "string",
			columnType: 'date', 
			allowNull: true
		},
		endDate: {
			type: "string",
			columnType: 'date', 
			allowNull: true
		},
		slotsTimes:{
			type:"json",columnType: 'array'
		},
		
		longitude: {
			type: "number",
			allowNull: true
		},
		longitude: {
			type: "number",
			allowNull: true
		},
		
  }
 
 };

