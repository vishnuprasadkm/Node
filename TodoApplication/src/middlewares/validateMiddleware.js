const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        status: 400,
        message: "Validation error!",
        details: error.details.map((d) => d.message),
      });
    }
    req.body = value; // validated/sanitized data
    next();
  };
};

export default validate;
