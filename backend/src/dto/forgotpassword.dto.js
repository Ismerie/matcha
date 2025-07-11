const { IsString } = require('class-validator');

class ForgotPasswordDto {
	@IsString()
	username;

	validateFields() {
    	const allowedFields = ['username'];
    	const receivedFields = Object.keys(this);
    	const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
    	if (unauthorizedFields.length > 0)
    		throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { ForgotPasswordDto };
