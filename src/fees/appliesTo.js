import Joi from 'joi';

export default Joi.array().items(Joi.object({
  source: Joi.string().required(),
  sourceId: Joi.string().required()
}));
