// error handling middleware, when we invoke an error, this function is called, and we decide what to do based on the error code.
const errorHandlingMiddleware = (err, req, res, next) => {
    // err object will contain the status codes, as per the class/object
    // custom error object to be sent to requester
    let customError = {
        statusCode: err.statusCode || 500,
        msg: err.message
    }
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
          .map((item) => item.message)
          .join(',');
        customError.statusCode = 400;
      }
      if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`;
        customError.statusCode = 404;
      }
    return res.status(customError.statusCode).json({msg: customError.msg});
}


// const errorHandlerMiddleware = (err, req, res, next) => {
//   let customError = {
//     // set default
//     statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
//     msg: err.message || 'Something went wrong try again later',
//   };
//   if (err.name === 'ValidationError') {
//     customError.msg = Object.values(err.errors)
//       .map((item) => item.message)
//       .join(',');
//     customError.statusCode = 400;
//   }
//   if (err.code && err.code === 11000) {
//     customError.msg = `Duplicate value entered for ${Object.keys(
//       err.keyValue
//     )} field, please choose another value`;
//     customError.statusCode = 400;
//   }
//   if (err.name === 'CastError') {
//     customError.msg = `No item found with id : ${err.value}`;
//     customError.statusCode = 404;
//   }

//   return res.status(customError.statusCode).json({ msg: customError.msg });
// };

module.exports = errorHandlingMiddleware;
