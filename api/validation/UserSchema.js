const Joi = require('joi');
const signup = Joi.object({
	firstName: Joi.string()
		.alphanum()
		.min(3)
		.max(30)
		.required(),
	lastName: Joi.string()
		.alphanum()
		.min(3)
		.max(30)
		.required(),

	email: Joi.string()
	       .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
	password: Joi.string().required(),
	gender: Joi.string().required(),
	dateOfBirth: Joi.date().less("now").required(),
	address:Joi.any()
});
const login = Joi.object({
	email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
	password: Joi.string().required(),
});
module.exports = {
	signup,
	login
}


