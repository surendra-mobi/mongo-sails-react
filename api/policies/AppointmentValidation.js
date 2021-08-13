const Joi = require('joi');
const appointmentSchema = Joi.object({
	appointmentDate: Joi.date().required(),
	appointmentTime: Joi.number().required(),
	appointmentType:Joi.string().required(),
        discount: Joi.any(),
        total: Joi.any(),
	//patientTimeZone:Joi.string().required(),
	patient:Joi.string().required(),
	provider:Joi.string().required()
});

module.exports = async (req, res, next) =>{
  	try {
	    const value = await appointmentSchema.validateAsync(req.body);
	    next();
	}catch (err) {
		return res.json(401, {
			err: err
		});
	}
}
