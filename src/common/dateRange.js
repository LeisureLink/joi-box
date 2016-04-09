import Joi from 'joi';

import dateSchema from './date';

export default (description) => Joi.object().description(description).keys({
  begin: dateSchema.required().notes('inclusive'),
  end: dateSchema.min(Joi.ref('begin')).notes('inclusive')
});
