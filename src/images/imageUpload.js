import Joi from 'joi';

let mutableFields = description => Joi.object({
  url: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  categories: Joi.array(),
  isDefault: Joi.bool().default(false),
  order: Joi.number().min(0).default(0)
}).description(description);

let mutableFieldsStrict = description => mutableFields(description).requiredKeys(
  'url'  
);

let multipleMutableFieldsStrict = description => Joi.array().items(mutableFieldsStrict(description));

export { mutableFields, mutableFieldsStrict, multipleMutableFieldsStrict };
