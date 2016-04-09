import Joi from 'joi';

export default Joi.date()
  .format('YYYYMMDD')
  .example('20160311')
  .raw();
