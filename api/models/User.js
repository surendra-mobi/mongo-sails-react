/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require("bcrypt");
const saltRounds = 8;
module.exports = {
  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200
    },
    password: {
      type: 'string',
      required: true,
      protect: true
    },
    emailStatus: {
      type: 'string',
      isIn: ['unconfirmed', 'confirmed'],
      defaultsTo: 'confirmed',    
    },
    firstName: {
      type: 'string',
      required: true,
      maxLength: 60
    },
    lastName: {
      type: 'string',
      required: true,
      maxLength: 60
    },
    gender: 'string',   
    address: {
      type: 'json'
    },    
    dateOfBirth: {
      type: 'string',
      columnType: 'date' 
    },
    profileImage: {type: 'json', columnType: 'array'},
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },
    passwordResetToken: 'string',
    passwordResetTokenExpiresAt: 'number',
    emailProofToken: 'string',
    emailProofTokenExpiresAt: 'number',    
    tosAcceptedByIp:'string',
    appointments:{collection:"Appointment"} 
  },
   beforeCreate: function(user, cb) {
		let myPlaintextPassword = user.password;
		const salt = bcrypt.genSaltSync(saltRounds);
		const hash = bcrypt.hashSync(myPlaintextPassword, salt);
		// Store hash in your password DB.
		user.password = hash;
		console.log(user)
		cb();
  },
  beforeUpdate: function(user, cb) {
                if(user.password){
		        let myPlaintextPassword = user.password;
			const salt = bcrypt.genSaltSync(saltRounds);
			const hash = bcrypt.hashSync(myPlaintextPassword, salt);
			// Store hash in your password DB.
			user.password = hash;
		}
		console.log(user)
		cb();
  }

};

