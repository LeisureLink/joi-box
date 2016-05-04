import { expect } from 'chai';
import Joi from 'joi';
import { imageUpload } from '../../src/images';

describe('Image Schemas', () => {
  describe('Mutable Fields', () => {
    it('should pass validation given a correct image object', () => {
      let correctImage =
        {
          description: 'test',
          categories: ['test1', 'test2'],
          isDefault: true,
          order: 0
        };

      let result = Joi.validate(correctImage, imageUpload.mutableFields('Mutable Fields'));
      expect(result.error).to.be.null;
    });

    it('should fail validation given an incorrect image object', () => {
      let incorrectImage = {
        unitId: null
      };

      let result = Joi.validate(incorrectImage, imageUpload.mutableFields('Mutable Fields'));
      expect(result.error).to.not.be.null;
    });
  });

  describe('Mutable Fields Strict', () => {
    it('should pass validation given a correct image object', () => {
      let correctImageObject = {
        url: 'something.com',
        title: 'test'
      };

      let result = Joi.validate(correctImageObject, imageUpload.mutableFieldsStrict('Mutable Fields Strict'));
      expect(result.error).to.be.null;
    });

    it('should fail validation if the image object is invalid', () => {
      let incorrectImage = {
        title: 'test2',
        description: 'test2',
        categories: ['test1', 'test2'],
        isDefault: true,
        order: 1
      };

      let result = Joi.validate(incorrectImage, imageUpload.mutableFieldsStrict('Mutable Fields Strict'));
      expect(result.error).to.not.be.null;
    });
  });

  describe('Multiple Mutable Fields Strict', () => {
    it('should pass validation given a correct array of image objects', () => {
      let correctImageArray = [
        {
          url: 'something.com',
          title: 'test',
          description: 'test',
          isDefault: true,
          order: 0
        },
        {
          url: 'something2.com',
          title: 'test2',
          categories: ['test1', 'test2'],
          isDefault: true,
          order: 1
        }
      ];

      let result = Joi.validate(correctImageArray, imageUpload.multipleMutableFieldsStrict('Multiple Mutable Fields Strict'));
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

      let result = Joi.validate(incorrectImageArray, imageUpload.multipleMutableFieldsStrict('Multiple Mutable Fields Strict'));
      expect(result.error).to.not.be.null;
    });
  });
});
