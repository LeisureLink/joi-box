import Joi from 'joi';

let uploadFields = description => Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  categories: Joi.string(),
  isDefault: Joi.bool().default(false),
  order: Joi.number().min(0).default(0),
  file: Joi.any()
}).description(description);

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

let uploadFieldsStrict = description => uploadFields(description).requiredKeys(
  'file'
);

let multipleMutableFieldsStrict = description => Joi.array().items(mutableFieldsStrict(description));

export { mutableFields, mutableFieldsStrict, multipleMutableFieldsStrict, uploadFields, uploadFieldsStrict };
