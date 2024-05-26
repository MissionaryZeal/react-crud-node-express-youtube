const CustomApiError = require("../errors/custom-error");

const errorHandling = (err, req, res, next) => {
    if (err instanceof CustomApiError) {
        res.status(err.statusCode).json(err.message);
    } else {
        res.status(500).json({ message: err.message });
    }
}
module.exports = errorHandling