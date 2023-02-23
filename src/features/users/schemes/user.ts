import Joi, { ObjectSchema } from 'joi';

const userSchema: ObjectSchema = Joi.object().keys({
    name: Joi.string().required().min(4).max(12).messages({
        'string.base': 'Name must be of string type',
        'string.min': 'Invalid Name',
        'string.max': 'Invalid Name',
        'string.empty': 'Name is a required field'
    }),
    email: Joi.string().required().email().messages({
        'string.base': 'Email must be of string type',
        'string.email': 'Email must be valid',
        'string:empty': 'Email is a required field',
    }),
    mobile: Joi.number().required().messages({
        'number.base': 'Mobile must be of number type',
        // 'number.min': 'Invalid mobile no.',
        // 'number.max': 'Invalid mobile no.',
        'number.empty': 'Mobile is a required field'
    }),
    roles: Joi.array().messages({
        'array.base': 'Roles must be of array type'
    }),
    

});

export { userSchema };