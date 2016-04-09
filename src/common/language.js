import Joi from 'joi';

export default Joi.string()
  .regex(/^[a-z]{2}(-[A-Z]{2})?$/)
  .description('Language')
  .default('en-US')
  .example('en-US');
