const Joi = require('joi');
const appointmentBookSchema = Joi.object({
	appointmentDate: Joi.date().required(),
	appointmentTime: Joi.number().required(),
	appointmentType:Joi.string().required(),
        discount: Joi.any(),
        total: Joi.any(),
	provider:Joi.string().required()
});

module.exports = {
	appointmentBookSchema,
}


