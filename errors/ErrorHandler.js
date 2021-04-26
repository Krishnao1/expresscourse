class ErrorHandler {
  constructor(status, msg) {
    this.status = status;
    this.message = msg;
  }
  ///static method use krte hai taki yahi pr object bana le
  static validationError(message = "all fields are required") {
    return new ErrorHandler(422, message);
  }

  static notFoundError(message = "Not found") {
    return new ErrorHandler(404, message);
  }

  static serverError(message = "internal error") {
    return new ErrorHandler(500, message);
  }
}

module.exports = ErrorHandler;
