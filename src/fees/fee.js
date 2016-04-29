import Joi from 'joi';

import appliesToSchema from './appliesTo';
import { endOptional as dateRangeSchema } from '../common/dateRange';
import feeIdSchema from './feeId';
import pmcIdSchema from '../pmc/pmcId';

const mutableFields = Joi.object().description('fee').keys({
  name: Joi.string(),
  description: Joi.string(),
  chargeUnit: Joi.string().valid(['PERSON', 'ROOM']),
  chargeFrequency: Joi.string().valid(['NIGHT', 'STAY']),
  isTaxable: Joi.boolean(),
  rates: Joi.array().min(1).items(Joi.object({
    name: Joi.string().allow(''),
    calculation: Joi.string().required().valid(['FLAT', 'PERCENTAGE_OF_BASE', 'PERCENTAGE_OF_SUBTOTAL']),
    amount: Joi.number().required().description('fee amount. When calculation is PERCENTAGE_OF_BASE or PERCENTAGE_OF_SUBTOTAL, 0.12 would equal a 12% fee'),
    applicability: dateRangeSchema('applicability')
  })),
  appliesTo: appliesToSchema
});


const mutableFieldsStrict = mutableFields.requiredKeys(
  '',
  'name',
  'chargeUnit',
  'chargeFrequency',
  'isTaxable',
  'rates'
);


const allFields = mutableFieldsStrict.keys({
  feeId: feeIdSchema.required(),
  pmcId: pmcIdSchema.required()
});


const summaryFields = Joi.object({
  feeId: feeIdSchema.required(),
  name: Joi.string().required(),
  link: Joi.string().required().description('A link to the details for the fee')
});


export default {
  mutableFields,
  mutableFieldsStrict,
  allFields,
  summaryFields
};
