import Joi from 'joi';

export default Joi.date().format('YYYY-MM-DD').meta({ format: 'date' }).description('ISO-8601 date string; e.g. "' + new Date().toISOString().substring(0, 10) + '"').raw();
