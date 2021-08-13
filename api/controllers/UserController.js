/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const ERROR_TEXT = require('../constants').MESSAGE;
const signup = async function(req, res) {
    try {
                let result = await User.findOne({
                    email: req.body.email
                });
                if(result){
                	throw "Email already exists";
                }
                let profileImage = await Common.imageUpload(req, 'assets/images', "test");
                const userData = { email, firstName,  lastName, gender, password, dateOfBirth, address} = req.body;
                userData.isAdmin = 0;
                userData.tosAcceptedByIp = req.ip;
                userData.profileImage = profileImage;
                let userResult = await User.create(userData).fetch();
                userData.id = userResult.id;
                return res.ok({
                    msg: 'User created successfulyy',
                    data: {
                        userData
                    },
                    status:true
                });
    } catch (error) {
        return res.badRequest({error});
    }
}
const create = async function(req, res) {
    try {
               let result = await User.findOne({
                    email: req.body.email
                });
                if(result){
                	throw "Email already exists";
                }
                let profileImage = await Common.imageUpload(req, 'assets/images', "test");
                const userData = { email, firstName,  lastName, gender, password, dateOfBirth, address} = req.body;
                userData.isAdmin = 0;
                userData.tosAcceptedByIp = req.ip;
                userData.profileImage = profileImage;
                let userResult = await User.create(userData).fetch();
                userData.id = userResult.id;
                return res.ok({
                    msg: 'User created successfulyy',
                    data: {
                        userData
                    },
                    status:true
                });
    } catch (error) {
        return res.badRequest({error});
    }
}

const update = async function(req, res) {
    try {
        	
                let id = req.params.id;
                if (!id) {
                    throw "Please provider user id";
                }
                let result = await User.findOne({
                    _id: id
                });
                if (!result) {
                    throw "In valid user id";
                }
                let profileImage = await Common.imageUpload(req, 'assets/images', "test");
                const userData = {firstName,  lastName, gender, password, dateOfBirth, address} = req.body;
                userData.isAdmin = 0;
                userData.tosAcceptedByIp = req.ip;
               if(profileImage && profileImage.length > 0) userData.profileImage = profileImage;
                let userResult = await User.update({
                    _id: id
                },userData).fetch();

                return res.ok({
                    msg: 'User update successfulyy',
                    data:userData,
                    status:true
                });
        
    } catch (error) {
        return res.badRequest({error});
    }
}

const deleteM = async function(req, res) {
    try {
        let id = req.params.id;
        if (!id) {
            throw "Please provider user id";
        }
        let result = await User.destroy(id).fetch();;
        if (!result) {
            throw "In valid user id";
        }
        return res.ok({
            msg: 'User created successfulyy',
            status: true
        });
     } catch (error) {
        return res.badRequest({error});
    }
    
}
const getAllUsers = async function(req, res) {
    try{
	    let recordPerPage = 6;
	    let currentPage = page = req.query.page || 1;
	    let result = await User.find({}).skip(recordPerPage * (page - 1)).limit(5);
	    if (!result) {
		throw "No User Data";
	    }
	    return res.ok({
		data: {
		    result,
		    currentPage,
		    recordPerPage,
		    totalRecords: result.length
		},
		status: true,
		code: 200
	    });
    } catch (error) {
        return res.badRequest({error});
    }
}
const get = async function(req, res) {
    try {
        let id = req.params.id;
        if (!id) {
            throw "Please provide user id";
        }
        let result = await User.findOne({
            id: id
        });
        if (!result) {
            throw "In valid user id";
        }
        return res.send({
            data: result
        });
    } catch (err) {
        return res.badRequest(err);
    }
}

const login = async (req, res) => {
    try{
        if (!req.body) {
            throw "Empty body";
        }
        const email = req.body.email;
        const password = req.body.password;
        if (!password) {
            throw "Invalid email or password";
        }
        let data = await UserManager.authenticateUserByPassword(email, password);
        res.ok(data);
    } catch (error) { console.log(error);
        return res.badRequest({error});
    }
}

const forgotPassword = function(req, res) {
    try{
        if (!req.body) {
        return res.badRequest(Utils.jsonError('Empty body'));
        }
        const email = req.body.email;
        UserManager
        .generateResetToken(email)
        .then(function(token) {
            res.ok({
                message: 'Check your email',
                token:token
            });
        })
        .catch(err => {
            if (err === ERROR_TEXT.USER_NOT_FOUND) {
                return res.notFound(Utils.jsonError('User not found'));
            }
            return res.serverError(Utils.jsonError(err));
        });
    } catch (error) {
        return res.badRequest({error});
    }
}
const changePassword = function(req, res) {
    try{
	    if (!req.body) {
		return res.badRequest(Utils.jsonError('Empty body'));
	    }
	    const email = req.body.email;
	    const currentPassword = req.body.password;
	    const newPassword = req.body.new_password;
	    const newPasswordConfirm = req.body.new_password_confirm;

	    if (!email || !validator.isEmail(email)) {
		throw 'Invalid email';
	    }

	    if (!currentPassword) {
		throw 'Current password is required';
	    }

	    if (!newPassword || newPassword !== newPasswordConfirm) {
		throw 'Password does not match';
	    }
  

	    UserManager
		.changePassword(email, currentPassword, newPassword)
		.then(function(token) {
		    return res.ok({
		        token
		    });
		})
		.catch(err => {
		    switch (err) {
		        case ERROR_TEXT.USER_NOT_FOUND:
		            return res.badRequest(Utils.jsonError('Email not found'));
		        case ERROR_TEXT.INVALID_PASSWORD:
		            return res.badRequest(Utils.jsonError('Invalid password'));
		        default:
		            return res.serverError(Utils.jsonError(err));
		    }
	     });
    }catch(error){
         return res.badRequest(Utils.jsonError(error));
    }
}


const resetPasswordByResetToken = function(req, res) {
   try{
	    if (!req.body) {
		return res.badRequest(Utils.jsonError('Empty body'));
	    }
	    const resetToken = req.body.reset_token;
	    const newPassword = req.body.new_password;
	    const newPasswordConfirm = req.body.new_password_confirm;
	    if (!resetToken) {
		return res.badRequest(Utils.jsonError('Reset token is required'));
	    }
	    if (!newPassword || newPassword !== newPasswordConfirm) {
		return res.badRequest(Utils.jsonError('Password does not match'));
	    }
	    UserManager
		.resetPasswordByResetToken(resetToken, newPassword)
		.then(() => {
		    res.ok({
		        message: 'Done'
		    });
		})
		.catch(err => {
		    console.log(err);
		    if (err === ERROR_TEXT.USER_NOT_FOUND) {
		        return res.badRequest(Utils.jsonError('Invalid email'));
		    }
		    /* istanbul ignore next */
		    return res.serverError(Utils.jsonError(err));
		});
   }catch(error){
         return res.badRequest(Utils.jsonError(error));
   }
}


const getUserDetails = async function(req, res) {
    try {
        let id = req.decoded.userId;
        if (!id) {
            throw "Please provide user id";
        }
        let result = await User.findOne({
            id: id
        });
        if (!result) {
            throw "In valid user id";
        }
        return res.send({
            data: result
        });
    } catch (err) {
        return res.badRequest(err);
    }
}
const updateProfile = async function(req, res) {
    try {        	
                let id = req.decoded.userId;
                if (!id) {
                    throw "Please provider user id";
                }
                let result = await User.findOne({
                    id: id
                });
                if (!result) {
                    throw "In valid user id";
                }
                let profileImage = await Common.imageUpload(req, 'assets/images', "test");
                const userData = {firstName,  lastName, gender, dateOfBirth, address} = req.body;
                userData.isAdmin = 0;
                userData.tosAcceptedByIp = req.ip;
                console.log(userData);
               if(profileImage && profileImage.length > 0) userData.profileImage = profileImage;
                let userResult = await User.update({
                    id: id
                },userData).fetch();

                return res.ok({
                    msg: 'User update successfulyy',
                    data:userData,
                    status:true
                });
        
    } catch (error) {
        return res.badRequest({error});
    }
}

module.exports = {
    create,
    update,
    deleteM,
    login,
    getAllUsers,
    forgotPassword,
    changePassword,
    resetPasswordByResetToken,
    signup,
    getUserDetails,
    updateProfile,
    get
}
