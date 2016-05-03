import { expect } from 'chai';
import Joi from 'joi';
import imageSchemas from '../../src/images';

describe('Image Schemas', () => {
  describe('Single Upload Schema', () => {
    it('should pass validation given a correct image object', () => {
      let correctImage =
        {
          url: 'something.com',
          title: 'test',
          description: 'test',
          categories: ['test1', 'test2'],
          isDefault: true,
          order: 0
        };

      let result = Joi.validate(correctImage, imageSchemas.singleUploadSchema);
      expect(result.error).to.be.null;
    });

    it('should fail validation given an incorrect image object', () => {
      let incorrectImage = {
        unitId: null,
        title: 'test',
        description: 'test',
        categories: ['test1', 'test2'],
        isDefault: true,
        order: 0
      };

      let result = Joi.validate(incorrectImage, imageSchemas.singleUploadSchema);
      expect(result.error).to.not.be.null;
    });
  });

  describe('Multiple Upload Schema', () => {
    it('should pass validation given a correct array of image objects', () => {
      let correctImageArray = [
        {
          url: 'something.com',
          title: 'test',
          description: 'test',
          categories: ['test1', 'test2'],
          isDefault: true,
          order: 0
        },
        {
          url: 'something2.com',
          title: 'test2',
          description: 'test2',
          categories: ['test1', 'test2'],
          isDefault: true,
          order: 1
        }
      ];

      let result = Joi.validate(correctImageArray, imageSchemas.multipleUploadSchema);
      expect(result.error).to.be.null;
    });

    it('should fail validation if an image inside of the array is invalid', () => {
      let correctImage = {
        url: 'something.com',
        title: 'test',
        description: 'test',
        categories: ['test1', 'test2'],
        isDefault: true,
        order: 0
      };

      let incorrectImage = {
        title: 'test2',
        description: 'test2',
        categories: ['test1', 'test2'],
        isDefault: true,
        order: 1
      };

      let incorrectImageArray = [correctImage, incorrectImage];

      let result = Joi.validate(incorrectImageArray, imageSchemas.multipleUploadSchema);
      expect(result.error).to.not.be.null;
    });
  });
});
