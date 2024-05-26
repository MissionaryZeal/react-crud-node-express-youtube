const CustomApiError = require('./custom-error');

const handleMongoError = (error) => {
    let statusCode;
    let validationErrors = {};
    if (error.name === 'ValidationError') {
        statusCode = 400
        Object.keys(error.errors).forEach((field) => {
            validationErrors[field] = error.errors[field].message;
        });
    } else if (error.code === 11000) {
        statusCode = 400
        validationErrors['product'] = "Product name must be unique";

    } else {
        statusCode = 500
        validationErrors['error'] = "Internal Server Error";
    }

    return new CustomApiError(validationErrors, statusCode);
}

module.exports = handleMongoError
