/**
 * AppointmentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const book = async function (req, res) {
     try{
	const value = await Validations.AppointmentSchema.appointmentBookSchema.validateAsync(req.body);
	const data = { appointmentDate, appointmentTime, appointmentType, discount, total, paymentDetails, disountDetails, patientTimeZone, provider}  = req.body;
	data.patient = req.decoded.userId;
	data.isActive = 1;
	let appointmentData = await Appointment.create(data);
	return res.ok({
	    msg: 'Appointment booked successfulyy',
	    status: true,
	    code: 200
	});	
     }catch(err){
      	return res.badRequest(Utils.jsonError(err));

     }
}
const getAll = async function (req, res) {
	try{
	        
		let recordPerPage = 6;
		let page = req.query.page || 1;
		let currentPage = page;
		let skip = recordPerPage * (page - 1);
		let limit = 5;
		let sortTitle = "";
		let sortOrder = "";
		let totalRecords = await Appointment.count({});
		let providerIds = [];
		let patientIds = [];
		let wherecond = [];
		let mainCond = {};
		let searchValues = req.query.searchValue;
		if(searchValues){
			Appointment.native(function(err, collection) {
			  if (err) return res.serverError(err);
			  let cursor = collection.aggregate([
			  	{
				     $lookup:
				       {
					 from: "user",
					 localField: "patient",
					 foreignField: "_id",
					 as: "user_patient"
				       }
				       
				  },
				  {
				     $lookup:
				       {
					 from: "provider",
					 localField: "provider",
					 foreignField: "_id",
					 as: "user_provider"
				       }
				       
				  },
				  {
				     $match: { $or: [{ "user_patient.firstName": searchValues }, { "user_provider.firstName": searchValues }] }
				       
				  },
				  {
					"$project": {
						"appointmentDate": 1,
						"appointmentTime": 1,
						"appointmentType": 1,
						"provider": 1,
						"total": 1,
						"patient": "1",
						"isActive": 1,
						"createdAt": 1,
						"discount": 1,
						"isCompleted": 1,
						"user_patient.firstName":1,
						"user_patient.lastName":1,
						"user_provider.firstName":1,
						"user_provider.lastName":1,
						"user_provider.address":1,
					}			
			           },
				{ "$limit": skip + limit },
				{ "$skip": skip }


			  
			  ]);

			  cursor.toArray(function (err, result) {
			    if (err) return res.serverError(err);
			    return   res.ok({
						data: {
							result,
							currentPage,
							recordPerPage,
							totalRecords,
							sortTitle,
							sortOrder
						},
						status: true,
						code: 200
					});
			  });
			  })

		
		}else{
			let result = await Appointment.find(mainCond)
				.populate('patient')
				.populate('provider').skip(recordPerPage * (page - 1)).limit(5);
			if (!result) {
			     throw new Error('No Appointment Data');
			 }
			return res.ok({
				data: {
					result,
					currentPage,
					recordPerPage,
					totalRecords,
					sortTitle,
					sortOrder
				},
				status: true,
				code: 200
			});	
		}
		
		

	}catch(err){
		return res.badRequest(err);
	}
}


module.exports = {  
   book,
   getAll
};


