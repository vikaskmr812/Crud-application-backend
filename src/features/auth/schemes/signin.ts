import Joi, { ObjectSchema } from 'joi';

const loginSchema: ObjectSchema = Joi.object().keys({
    email: Joi.string().required().email().messages({
        'string.base': 'Email must be of string type',
        'string.email': 'Email must be valid',
        'string:empty': 'Email is a required field',
    }),
    password: Joi.string().required().min(4).max(15).messages({
        'string.base': 'Password must be a string',
        'string.min': 'Invalid Password',
        'string:max': 'Invalid Password',
        'string.empty': 'Password is a required field.'
    })
});

export { loginSchema };