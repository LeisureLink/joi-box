import Joi from 'joi';
import dateSchema from '../common/date';

module.exports = Joi.array().items(Joi.object({
  begin: dateSchema.required(),
  end: dateSchema.min(Joi.ref('begin')).required(),
  availability: Joi.object({
    allocated: Joi.number().min(0).required()
  }).required()
})).min(1);
