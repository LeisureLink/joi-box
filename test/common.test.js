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

  describe('currencyCode', () =>{
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
  describe('currencyAmount', () => {

    it('Does not allow empty strings', () => {
      expect(() => joi.attempt('', common.currencyAmount)).to.throw();
    });

    it('Does not allow numbers', () => {
      expect(() => joi.attempt(100.23, common.currencyAmount)).to.throw();
    });

    it('Does not allow non-numeric strings', () => {
      expect(() => joi.attempt('asdf', common.currencyAmount)).to.throw();
    });

    it('Does not allow strings with decimals', () => {
      expect(() => joi.attempt('100.23', common.currencyAmount)).to.throw();
    });

    it('Does not allow strings with commas', () => {
      expect(() => joi.attempt('100,232', common.currencyAmount)).to.throw();
    });

    it('Allows positive integer strings', () => {
      expect(() => joi.attempt('100232', common.currencyAmount)).to.not.throw();
    });

    it('Allows negative integer strings', () => {
      expect(() => joi.attempt('-100232', common.currencyAmount)).to.not.throw();
    });

    it('Allows zero strings', () => {
      expect(() => joi.attempt('0', common.currencyAmount)).to.not.throw();
    });
  });
  describe('positiveCurrencyAmount', () => {

    it('Does not allow empty strings', () => {
      expect(() => joi.attempt('', common.positiveCurrencyAmount)).to.throw();
    });

    it('Does not allow numbers', () => {
      expect(() => joi.attempt(100.23, common.positiveCurrencyAmount)).to.throw();
    });

    it('Does not allow non-numeric strings', () => {
      expect(() => joi.attempt('asdf', common.positiveCurrencyAmount)).to.throw();
    });

    it('Does not allow strings with decimals', () => {
      expect(() => joi.attempt('100.23', common.positiveCurrencyAmount)).to.throw();
    });

    it('Does not allow strings with commas', () => {
      expect(() => joi.attempt('100,232', common.positiveCurrencyAmount)).to.throw();
    });

    it('Allows positive integer strings', () => {
      expect(() => joi.attempt('100232', common.positiveCurrencyAmount)).to.not.throw();
    });

    it('Does not allow negative integer strings', () => {
      expect(() => joi.attempt('-100232', common.positiveCurrencyAmount)).to.throw();
    });

    it('Does not allow zero strings', () => {
      expect(() => joi.attempt('0', common.positiveCurrencyAmount)).to.throw();
    });
  });
});
