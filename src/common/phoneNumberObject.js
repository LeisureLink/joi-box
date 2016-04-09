import Joi from 'joi';

export default Joi.object().description('phone number').keys({
  countryCode: Joi.string().regex(/^[0-9]+$/).description('Only numbers are allowed'),
  mainNumber: Joi.string().required().regex(/^[0-9]+$/).description('Only numbers are allowed'),
  ext: Joi.string()
});