import Joi from 'joi';
import singleUploadSchema from './singleUploadSchema';

export default Joi.array().items(singleUploadSchema);
