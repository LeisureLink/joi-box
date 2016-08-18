import common from '../src/common';
import { expect } from 'chai';
import joi from 'joi';

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

  describe('bool', () => {
    it('should expose a Joi Object', () => {
      expect(common.bool('description!').isJoi).to.be.true;
    });
  });

  describe.only('currencyCode', () =>{
    it('should expose a joi object', () =>{
      expect(common.currencyCode.isJoi).to.be.true;
    });

    it("doesn't allow bogus currencyCode", () =>{
      expect(() =>{
        joi.attempt('bye', common.currencyCode);
      }).to.throw(/must be one of/);
    });

    it("doesn't throw an error for valid codes", () =>{
      expect(() =>{
        joi.attempt('ANG', common.currencyCode);
      }).to.not.throw();
    });

    it("doesn't throw for lowercase valid code", () =>{
      expect(() =>{
        joi.attempt('xts', common.currencyCode);
      }).to.not.throw();
    });

    it('Uppercases codezes', () =>{
      let value = joi.attempt('zwl', common.currencyCode);
      expect(value).to.equal('ZWL');
    });
  });
});
