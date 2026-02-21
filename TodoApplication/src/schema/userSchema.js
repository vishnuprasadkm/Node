import joi from "joi";

const userRegisterSchema = joi.object({
  userName: joi.string().min(5).max(12).required(),
  email: joi.string().email().required(),
  firstName: joi.string().max(50).required(),
  lastName: joi.string().max(50).required(),
  password: joi.string().min(5).required(),
  role: joi.string().valid("user", "admin").default("user"),
});

const userLoginSchema = joi.object({
  userName: joi.string().required(),
  password: joi.string().required(),
}).unknown(false);

const userUpdateSchema = joi.object({
  userName: joi.string().min(5).max(12).optional(),
  email: joi.string().email().optional(),
  firstName: joi.string().max(50).optional(),
  lastName: joi.string().max(50).optional(),
  password: joi.string().min(5).optional(),
});

export { userLoginSchema, userRegisterSchema, userUpdateSchema };
