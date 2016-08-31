import Joi from 'joi';

export default Joi.string().regex(/^([1-9]|1[0-2]):[0-5][0-9] [AaPp][Mm]$/).meta({ format: 'time' }).description('12 hour time string e.g. 12:30 PM');
