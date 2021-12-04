export const logErrors = (err, req, res, next) => {
  console.log('logErrors');
  console.error(err);
  next(err);
};

export const boomErrorHandler = (err, req, res, next) => {
  console.log('boomErrorHandler');
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
};

export const errorHandler = (err, req, res, next) => {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};
