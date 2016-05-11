import { expect } from 'chai';
import Joi from 'joi';
import { mediaUpload } from '../../src/media';

describe('Media Files Schemas', () => {
  describe('Mutable Fields', () => {
    it('should pass validation given a correct media file object', () => {
      let correctMedia =
        {
          description: 'test',
          categories: ['test1', 'test2'],
          isDefault: true,
          order: 0
        };

      expect(() => {
        Joi.attempt(correctMedia, mediaUpload.mutableFields('Mutable Fields'));
      }).to.not.throw();
    });

    it('should fail validation given an incorrect media file object', () => {
      let incorrectMedia = {
        unitId: null
      };

      expect(() => {
        Joi.attempt(incorrectMedia, mediaUpload.mutableFields('Mutable Fields'));
      }).to.throw(/'unitId' is not allowed/);
    });
  });

  describe('Mutable Fields Strict', () => {
    it('should pass validation given a correct media file object', () => {
      let correctMediaObject = {
        url: 'something.com',
        title: 'test'
      };

      expect(() => {
        Joi.attempt(correctMediaObject, mediaUpload.mutableFieldsStrict('Mutable Fields Strict'));
      }).to.not.throw();
    });

    it('should fail validation if the media file object is invalid', () => {
      let incorrectMedia = {
        title: 'test2',
        description: 'test2',
        categories: ['test1', 'test2'],
        isDefault: true,
        order: 1
      };

      expect(() => {
        Joi.attempt(incorrectMedia, mediaUpload.mutableFieldsStrict('Mutable Fields Strict'));
      }).to.throw(/'url' is required/);
    });
  });

  describe('Multiple Mutable Fields Strict', () => {
    it('should pass validation given a correct array of media file objects', () => {
      let correctMediaArray = [
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
        Joi.attempt(correctMediaArray, mediaUpload.multipleMutableFieldsStrict('Multiple Mutable Fields Strict'));
      }).to.not.throw();
    });

    it('should fail validation if an media file inside of the array is invalid', () => {
      let correctMedia = {
        url: 'something.com',
        title: 'test',
        description: 'test',
        categories: ['test1', 'test2'],
        isDefault: true,
        order: 0
      };

      let incorrectMedia = {
        title: 'test2',
        description: 'test2',
        categories: ['test1', 'test2'],
        isDefault: true,
        order: 1
      };

      let incorrectMediaArray = [correctMedia, incorrectMedia];

      expect(() => {
        Joi.attempt(incorrectMediaArray, mediaUpload.multipleMutableFieldsStrict('Multiple Mutable Fields Strict'));
      }).to.throw(/'url' is required/);
    });
  });
});
