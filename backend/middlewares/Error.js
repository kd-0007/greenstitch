module.exports = (err , req , res , next) => {
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    if(err.name=="CastError"){
        err.message = `Resources not found. Invalid ${err.path}`;
        err.statusCode = 404;
    }
    if(err.name =="JsonWebTokenError"){
        err.message = "Token is not valid"
        err.statusCode = 400;
    }
    if(err.code == 11000){
        err.message = `Duplicate Recources ${Object.keys(err.keyValue)}`
        err.statusCode = 500;
    }

    res.status(err.statusCode).json({
        message: err.message,
        success: false
    })
}