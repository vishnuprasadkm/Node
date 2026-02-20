export default function errorHandler(err, req, res, next) {
  console.log(err.stack);

  res.status(res.status || 500).json({
    status: res.status || 500,
    message: "Something went wrong",
    err: err.message,
  });
}
