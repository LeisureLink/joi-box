import { expect } from 'chai';
import Joi from 'joi';
import { imageUpload } from '../../src/images';

describe.only('Image Schemas', () => {
  describe('Mutable Fields', () => {
    it('should pass validation given a correct image object', () => {
      let correctImage =
        {
          description: 'test',
          categories: ['test1', 'test2'],
          isDefault: true,
          order: 0
        };

      expect(() => {
        Joi.attempt(correctImage, imageUpload.mutableFields('Mutable Fields'));
      }).to.not.throw();
    });

    it('should fail validation given an incorrect image object', () => {
      let incorrectImage = {
        unitId: null
      };

      expect(() => {
        Joi.attempt(incorrectImage, imageUpload.mutableFields('Mutable Fields'));
      }).to.throw(/"unitId" is not allowed/);
    });
  });

  describe('Mutable Fields Strict', () => {
    it('should pass validation given a correct image object', () => {
      let correctImageObject = {
        url: 'something.com',
        title: 'test'
      };

      expect(() => {
        Joi.attempt(correctImageObject, imageUpload.mutableFieldsStrict('Mutable Fields Strict'));
      }).to.not.throw();
    });

    it('should fail validation if the image object is invalid', () => {
      let incorrectImage = {
        title: 'test2',
        description: 'test2',
        categories: ['test1', 'test2'],
        isDefault: true,
        order: 1
      };

      expect(() => {
        Joi.attempt(incorrectImage, imageUpload.mutableFieldsStrict('Mutable Fields Strict'));
      }).to.throw(/"url" is required/);
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

      expect(() => {
        Joi.attempt(correctImageArray, imageUpload.multipleMutableFieldsStrict('Multiple Mutable Fields Strict'));
      }).to.not.throw();
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

      expect(() => {
        Joi.attempt(incorrectImageArray, imageUpload.multipleMutableFieldsStrict('Multiple Mutable Fields Strict'));
      }).to.throw(/"url" is required/);
    });
  });
});
