import joi from 'joi';

export default joi.string()
  .description('The product management company (PMC) unique id')
  .alphanum().min(4).max(30)
  .required()
  .example('123456789abcdefghijklmnopqrstu');
