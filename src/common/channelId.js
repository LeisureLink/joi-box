import joi from 'joi';

export default joi.string()
  .description('The channel/ota id')
  .required()
  .regex(/[0-9a-z]{24}/i)
  .example('56be1c5d65fbe4a1221e6427')
  .example('16be1c5d65fbe4a1221e9087');
