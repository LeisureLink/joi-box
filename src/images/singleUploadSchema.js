import Joi from 'joi';

export default Joi.object({
  url: Joi.string().required(),
  title: Joi.string(),
  description: Joi.string(),
  categories: Joi.array(),
  isDefault: Joi.bool().default(false),
  order: Joi.number().min(0).default(0)
});
