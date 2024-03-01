function createError({statusCode, message}){
    let err = new Error();
    err.status = statusCode;
    err.message = message;
    return err
}

module.exports = createError;