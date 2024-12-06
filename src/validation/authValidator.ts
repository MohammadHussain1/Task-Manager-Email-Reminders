import Joi from 'joi';

const userRegistrationValidation = {
  body: Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(20).required(),
    email: Joi.string().email().required(),
  }),
};

const userLoginSchemaValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
  }),
};

export { userRegistrationValidation, userLoginSchemaValidation };
