const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(1).max(100).optional(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(8).max(128)
    .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
    .message('Password must have upper, lower and number')
    .required()
});

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };
