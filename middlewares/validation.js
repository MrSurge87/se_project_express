const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateCreateItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min" : 'Must be minimum of 2 characters long',
      "string.max" : 'Maximum of 30 characters',
      "string.empty" : 'The "name" field must be filled in',
    }),
    weather: Joi.string().valid('hot', 'warm', 'cold').required(),
    imageUrl: Joi.string().required().custom(validateUrl).messages({
      "string.uri" : 'The "imageUrl" field must be a valid url',
      "string.empty" : 'The "imageUrl" field must be filled in',
    }),
  }),
});

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    username: Joi.string().required().min(2).max(30).messages({
      "string.min" : 'Must be minimum of 2 characters long.',
      "string.max" : 'Maximum of 30 characters',
      "string.empty" : 'The "name" field mst be filled in',
    }),
    email: Joi.string().required().email().messages({
      "string.empty" : 'The "email" field must be filled in',
      "string.email" : 'The "email" must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty" : 'The "password" field must be filled in',
    }),
  })
});

module.exports.validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min" : 'Must be minimum of 2 characters long',
      "string.max" : 'Maximum of 30 characters',
      "string.empty" : 'The "name" field must be filled in',
    }),
    avatar: Joi.string().custom(validateUrl).messages({
      "string.empty" : 'The "avatarUrl" field must be filled in',
      "string.uri" : 'The "avatarUrl" must be a valid url',
    }),
  }),
});

module.exports.validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty" : 'The "email" field must be filled in',
      "string.email" : 'The "email" must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty" : 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().length(24).regex(/^[A-Fa-f0-9]{24}$/).messages({
      "string.length" : 'The "id" field is not a valid length',
    }),
  }),
});

