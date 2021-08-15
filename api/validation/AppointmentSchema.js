const Joi = require('joi');
const book = Joi.object({
	appointmentDate: Joi.date().required(),
	appointmentTime: Joi.number().required(),
	appointmentType:Joi.string().required(),
        discount: Joi.any(),
        total: Joi.any(),
	provider:Joi.string().required()
});

module.exports = {
	book,
}


