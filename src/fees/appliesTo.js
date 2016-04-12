import Joi from 'joi';

import unitIdSchema from '../units/unitId';

export default Joi.array().items(Joi.object({
  unitId: unitIdSchema
}));
