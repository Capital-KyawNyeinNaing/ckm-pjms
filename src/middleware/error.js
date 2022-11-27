const ErrorResponse = require("../util/errorres");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //* log for dev
  console.log(err);

  //* mongoose bad id
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(404, message);
  }

  //* mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered. key value is "${err?.keyValue?.name}"`;
    error = new ErrorResponse(400, message);
  }

  //* mongoose validate error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(400, message);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
