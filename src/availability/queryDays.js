import Joi from 'joi';

export default Joi.number()
  .min(1)
  .max(730)
  .description('Number of days to query, starting with today')
  .example(180)
  .default(30);

