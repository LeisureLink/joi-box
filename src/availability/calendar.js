import Joi from 'joi';
import shortId from '../common/shortId';

let mutableFields = Joi.object({
  calendarType: Joi.string().valid(['INVENTORY', 'CONFIRMATION_METHOD']).description('Enum value for calendarType'),
  sellMode: Joi.string().valid(['AVAILABLE', 'UNAVAILABLE', 'CALL_AND_REQUEST']).description('Enum value for sellMode')
});

let mutableFieldsStrict = mutableFields.requiredKeys(
  'calendarType',
  'sellMode'
);

let postFields = mutableFieldsStrict.keys({
  calendarId: shortId.required()
});

module.exports = {
  mutableFields,
  mutableFieldsStrict,
  postFields
};
