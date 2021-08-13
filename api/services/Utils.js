module.exports = {

	/**
	 * Returns an object with error field for response
	 * @param errorMessage {string}
	 * @returns {{err_msg: {string}}}
	 */
	jsonError(errorMessage, details="") {
		return {
			err_msg: errorMessage,details
		};
	}
};

