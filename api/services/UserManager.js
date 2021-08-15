const jwt = require('jsonwebtoken');
const moment = require('moment');
const farmhash = require('farmhash');
const ERROR_TEXT = require('../constants').MESSAGE;
const LOCK_INTERVAL_SEC = 120;
const LOCK_TRY_COUNT = 5;
const bcrypt = require("bcrypt");
const crypto = require("crypto");
function doesUsernameExist(email) {
	return new Promise((resolve, reject) => {
		User
			.findOne({email: email})
			.exec((err, user) => {
				if (err) return reject(err);
				return resolve(!!user);
			});
	});
}


const createUser = (values) => {
		const email = values.email;
		return new Promise((resolve, reject) => {
			doesUsernameExist(email)
				.then(exists => {
					if (exists) {
						return reject(ERROR_TEXT.EMAIL_IN_USE);
					}
					User.create(values).exec((createErr, user) => {
						if (createErr) return reject(createErr);
						generateUserToken(user, token => {
							resolve(token);
							EmailService.sendWelcome(email);
						});
					});
				})
				.catch(reject);
		});
}
const generateUserToken = function (user, done) {

		const passwordHash = farmhash.hash32(user.password);
		const payload = {
			id: user.id,
			pwh: passwordHash,
			firstName:user.firstName,
			isAdmin:user.isAdmin
		};

		const token = jwToken.issue(
			payload
		);
		return done(token);
	}

const authenticateUserByToken = function (token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, sails.config.jwt_secret, {}, (err, tokenData) => {
				if (err) return reject(err); // JWT parse error

				User
					.findOne({id: tokenData.id})
					.exec((err, user) => {
						if (err) return reject(err); // Query error
						if (!user) return reject(ERROR_TEXT.USER_NOT_FOUND);
						if (user.locked) return reject(ERROR_TEXT.USER_LOCKED);

						const passwordHash = farmhash.hash32(user.encryptedPassword);
						if (tokenData.pwh !== passwordHash) { // Old token, built with inactive password
							return reject(ERROR_TEXT.INACTIVE_TOKEN);
						}
						return resolve(user);
					});
			});
		});
	}

const validatePassword = (email, password)=> {
		return new Promise((resolve, reject) => {
			User
				.findOne({email: email})
				.exec((err, user) => {
					if (err) return reject(err);
					if (!user) return reject(ERROR_TEXT.USER_NOT_FOUND);
					if (user.locked) return reject(ERROR_TEXT.USER_LOCKED);
			                const isMatched = bcrypt.compareSync(password, user.password);
                                        console.log("isMatched", isMatched)
					if(isMatched){
						resolve({isValid:true, user});
					}else{
						reject(false);
					}
					
				});
		});
	}


const authenticateUserByPassword = (email, password)=> {
		return new Promise((resolve, reject) => {
			UserManager
				.validatePassword(email, password)
				.then(({isValid, user}) => {
					if (!isValid) {
						return reject(ERROR_TEXT.INVALID_EMAIL_PASSWORD);
					}else {					       		       
					       generateUserToken(user, token => {
					                delete user.password;
					                delete user.id;	
							resolve({token, user});
					       });
					}
				})
				.catch((err)=>{
					console.log(err)
					reject(ERROR_TEXT.INVALID_EMAIL_PASSWORD)
				});
		});
	}

const generateResetToken = (email)=> {
		return new Promise((resolve, reject) => {
			User
				.findOne({email})
				.exec(async (err, user) => {
					if (err) return reject(err);
					if (!user) return reject(ERROR_TEXT.USER_NOT_FOUND);
					const resetToken = crypto.randomBytes(32).toString('hex');
					user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
					user.passwordResetTokenExpiresAt = Date.now() + 10 * 60 * 1000;
					console.log(user);
					
				         const updatedUser = await User.updateOne({ email:user.email })
					.set({
					  passwordResetToken:user.passwordResetToken,
				           passwordResetTokenExpiresAt:user.passwordResetTokenExpiresAt
					});
					if (updatedUser) {
						await EmailService.sendResetToken(email, user.passwordResetToken);
						resolve(user.passwordResetToken);
					}else {
						reject('The database does not contain a user');
					}

				});
		});
}

const changePassword = async (email, currentPassword, newPassword) =>{
		return new Promise((resolve, reject) => {
			UserManager
				.validatePassword(email, currentPassword)
				.then(({isValid, user}) => {
					if (!isValid) {
						return reject(ERROR_TEXT.INVALID_PASSWORD);
					}
					else {
						user
							.setPassword(newPassword)
							.then(() => {
								user.resetToken = null;
								user.passwordFailures = 0;
								user.lastPasswordFailure = null;
								user.save();
								generateUserToken(user, token => {
									resolve(token);
								});
							})
							.catch(reject);
					}
				})
				.catch(reject);
		});
	}
const resetPasswordByResetToken = function (resetToken, newPassword) {
		return new Promise(async (resolve, reject) => {		
			var updatedUser = await User.updateOne({passwordResetToken:resetToken})
					.set({
					        password:newPassword,
					  	passwordResetToken:"",
				          	passwordResetTokenExpiresAt:0,
					 });
			console.log("updatedUser", updatedUser);
			if (updatedUser) {
				resolve();
			}else {
				reject('The database does not contain a user');
			}
		});
}
const getIds = function (search, model) {
		return new Promise(async (resolve, reject) => {	
		        try{	
				let user = await User.find({where:{or:[{firstName: search}, {email:"search"}]}, select:["id"]});
				user = user.map(ele=>ele.id)
				resolve(user)
			}catch(err){
				console.log(err);
			}
		});
}
module.exports = {
	doesUsernameExist,
	resetPasswordByResetToken,
	changePassword,
	generateResetToken,
	authenticateUserByPassword,
	validatePassword,
	authenticateUserByToken,
	createUser,
	getIds
 };

