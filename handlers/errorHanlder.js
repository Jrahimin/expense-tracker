const errorHandler = (error, req, res, next) => {
    if(error) {
        console.log(error);
        return res.status(200).json({
           status: "error",
           message: error.message || error
        });
    }

    next();
}

module.exports = errorHandler;