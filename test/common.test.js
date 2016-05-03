import common from '../src/common';
import { expect } from 'chai';

describe('Common Schemas', () => {

  describe('date', () => {
    it('should expose a Joi Object', () => {
      expect(common.date.isJoi).to.be.true;
    });
  });

  describe('dateRange', () => {
    it('should expose a Joi Object', () => {
      expect(common.dateRange.mutableFields('description!').isJoi).to.be.true;
    });
  });

  describe('language', () => {
    it('should expose a Joi Object', () => {
      expect(common.language.isJoi).to.be.true;
    });
  });

  describe('phoneNumberObject', () => {
    it('should expose a Joi Object', () => {
      expect(common.phoneNumberObject.isJoi).to.be.true;
    });
  });

  describe('shortId', () => {
    it('should expose a Joi Object', () => {
      expect(common.shortId.isJoi).to.be.true;
    });
  });
  
});
