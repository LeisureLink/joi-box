import Joi from 'joi';

import phoneNumberObjectSchema from '../common/phoneNumberObject';
import pmcIdSchema from './pmcId';

const mutableFields = Joi.object().description('pmc').label('pmc').keys({
  name: Joi.string(),
  phoneNumber: phoneNumberObjectSchema,
  reservationPhoneNumber: phoneNumberObjectSchema,
  emailAddress: Joi.string().email(),
  websiteUrl: Joi.string().uri()
});

const mutableFieldsStrict = mutableFields.requiredKeys(
  '',
  'name',
  'phoneNumber',
  'reservationPhoneNumber',
  'emailAddress'
);

const allFields = mutableFieldsStrict.keys({
  pmcId: pmcIdSchema.required(),
  phoneNumber: phoneNumberObjectSchema.keys({
    mainNumber: Joi.reach(phoneNumberObjectSchema, 'mainNumber').allow('')
  }),
  reservationPhoneNumber: phoneNumberObjectSchema.keys({
    mainNumber: Joi.reach(phoneNumberObjectSchema, 'mainNumber').allow('')
  }),
  emailAddress: Joi.reach(mutableFields, 'emailAddress').allow('')
});

const summaryFields = Joi.object({
  pmcId: pmcIdSchema.required(),
  name: Joi.string().required(),
  link: Joi.string().required()
});

export default {
  mutableFields,
  mutableFieldsStrict,
  allFields,
  summaryFields
};
