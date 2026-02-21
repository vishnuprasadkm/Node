import joi from "joi";

const todoSchema = joi.object({
  title: joi.string().min(5).max(80).required(),
  description: joi.string().max(80).optional(),
  priority: joi.number().integer().min(1).max(5).optional(),
  complete: joi.boolean().default(false),
});

const updateTodoSchema = joi.object({
  title: joi.string().min(5).max(80).optional(),
  description: joi.string().max(80).optional(),
  priority: joi.number().integer().min(1).max(5).optional(),
  complete: joi.boolean().optional(),
});

export { todoSchema, updateTodoSchema };
