import Joi , {ObjectSchema} from 'joi'

const signupSchema: ObjectSchema = Joi.object().keys({
    name: Joi.string().required().min(4).max(12).messages({
        'string.base': 'Name must be of string type',
        'string.min': 'Invalid Name',
        'string.max': 'Invalid Name',
        'string.empty': 'Name is a required field'
    }),
    email: Joi.string().required().email().messages({
        'string.base': 'Email must be of string type',
        'string.email': 'Email must be valid',
        'string.empty': 'Email is a required field',
    }),
    mobile:Joi.string().required().equal(10).messages({
        'number.base': 'Mobile must be of number type',
        'number.equal': 'Invalid mobile no.',
        'number.empty': ' mobile is a required field',
    }),
    password:Joi.string().required().min(4).max(15).messages({
        'string.base': 'password must be string',
        'string.min': 'Iinvalid Password',
        'string.max': 'Invalid Password',
        'string.empty': 'Password is a required field'

    })
})