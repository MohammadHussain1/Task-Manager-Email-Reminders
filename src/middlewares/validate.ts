import Joi, { ValidationErrorItem } from 'joi';
import { Request, Response, NextFunction } from 'express';

interface Schema {
  body?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
}

const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validationResults: ValidationErrorItem[] = [];

    if (schema.body) {
      const { error } = schema.body.validate(req.body, { abortEarly: false });
      if (error) {
        validationResults.push(...error.details); 
      }
    }

    if (schema.params) {
      const { error } = schema.params.validate(req.params, { abortEarly: false });
      if (error) {
        validationResults.push(...error.details);
      }
    }

    if (schema.query) {
      const { error } = schema.query.validate(req.query, { abortEarly: false });
      if (error) {
        validationResults.push(...error.details);
      }
    }

    if (validationResults.length > 0) {
       res.status(400).json({
        message: 'Validation error',
        details: validationResults.map((err) => err.message),
      });
    }

    next();
  };
};

export { validate };
