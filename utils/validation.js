const createError = require("./error");

const validateRequest = (schema) => (req, res, next) => {
    const {error, value} = schema.validate(req.body);
    if(error){
        return next(createError({statusCode: 400, message: error.message}));
    }
    next();
}

module.exports = validateRequest;