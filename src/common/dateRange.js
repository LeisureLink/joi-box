import Joi from 'joi';

import dateSchema from './date';

let mutableFields = description => Joi.object().description(description).keys({
  begin: dateSchema.notes('inclusive'),
  end: dateSchema.min(Joi.ref('begin')).notes('inclusive')
});

let endOptional = description => mutableFields(description).requiredKeys(
  'begin'
);

let mutableFieldsStrict = description => mutableFields(description).requiredKeys(
  'begin',
  'end'
);

export { mutableFields, mutableFieldsStrict, endOptional };
