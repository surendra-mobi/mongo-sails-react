const ERROR_TEXT = require('../constants').MESSAGE;
const create = async function(req, res) {
    try {
               const ratingData = { fromPatient, toProvider,  appointmentId, rating, message} = req.body;
               let result = await RatingReview.findOne({
                    fromPatient, toProvider,  appointmentId
                });
                if(result){
                	throw "Rating already updated";
                }
                ratingData.status = 1;
                let userResult = await RatingReview.create(ratingData).fetch();
                ratingData.id = userResult.id;
                return res.ok({
                    msg: 'User created successfulyy',
                    data: {
                        ratingData
                    },
                    status:true
                });
    } catch (error) {
        return res.badRequest({error});
    }
}

const getAllRatings = ()=>{
}

module.exports = {
    create,
    getAllRatings
}
