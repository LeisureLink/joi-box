import Joi from 'joi';

export default Joi.string()
  .regex(/^[1-9][0-9]*$/)
  .description('Currency Amount in lowest denomination without decimal places. For example, an object like this: { amount:"10000", code:"USD } would represent $100.00 USD')
  .example('10000');
