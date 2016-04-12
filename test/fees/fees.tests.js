import _ from 'lodash';
import { expect } from 'chai';
import Joi from 'joi';

import feesSchema from '../../src/fees/fee';
import mockFeeReq from './fee.req';
import mockFeeRes from './fee.res';

describe('fee schema validation', () => {
  let testReqFee;
  let testResFee;

  beforeEach(() => {
    testReqFee = _.cloneDeep(mockFeeReq);
    testResFee = _.cloneDeep(mockFeeRes);
  });

  describe('mutableFields', () => {

    describe('name', () => {

      it('should not allow name to be an empty string', () => {
        testReqFee.name = '';
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"name" is not allowed to be empty');
      });

    });

    describe('description', () => {

      it('should not allow description to be empty', () => {
        testReqFee.description = '';
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"description" is not allowed to be empty');
      });

    });

    describe('chargeUnit', () => {

      it('should not allow chargeUnit to be empty', () => {
        testReqFee.chargeUnit = '';
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"chargeUnit" is not allowed to be empty');
      });

      it('should allow chargeUnit to be PERSON', () => {
        testReqFee.chargeUnit = 'PERSON';
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.not.exist;
      });

      it('should allow chargeUnit to be ROOM', () => {
        testReqFee.chargeUnit = 'ROOM';
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.not.exist;
      });

      it('should not allow chargeUnit to be a random value', () => {
        testReqFee.chargeUnit = 'RANDOM';
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"chargeUnit" must be one of [PERSON, ROOM]');
      });

    });

    describe('chargeFrequency', () => {

      it('should not allow changeFrequency to be an empty string', () => {
        testReqFee.chargeFrequency = '';
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"chargeFrequency" is not allowed to be empty');
      });

      it('should allow changeFrequency to be NIGHT', () => {
        testReqFee.chargeFrequency = 'NIGHT';
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.not.exist;
      });

      it('should allow changeFrequency to be STAY', () => {
        testReqFee.chargeFrequency = 'STAY';
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.not.exist;
      });

      it('should not allow changeFrequency to be a random string', () => {
        testReqFee.chargeFrequency = 'RANDOM';
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"chargeFrequency" must be one of [NIGHT, STAY]');
      });

    });

    describe('rates', () => {

      it('should not allow an empty array if supplied', () => {
        testReqFee.rates = [];
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"rates" must contain at least 1 items');
      });

      it('should allow empty names', () => {
        testReqFee.rates[0].name = '';
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.not.exist;
      });

      it('should require calculation', () => {
        delete testReqFee.rates[0].calculation;
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"calculation" is required');
      });

      it('should not allow calculation to be empty', () => {
        testReqFee.rates[0].calculation = '';
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"calculation" is not allowed to be empty');
      });

      it('should allow calculation to be FLAT', () => {
        testReqFee.rates[0].calculation = 'FLAT';
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.not.exist;
      });

      it('should allow calculation to be PERCENTAGE_OF_BASE', () => {
        testReqFee.rates[0].calculation = 'PERCENTAGE_OF_BASE';
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.not.exist;
      });

      it('should allow calculation to be PERCENTAGE_OF_SUBTOTAL', () => {
        testReqFee.rates[0].calculation = 'PERCENTAGE_OF_SUBTOTAL';
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.not.exist;
      });

      it('should not allow calculation to be a random string', () => {
        testReqFee.rates[0].calculation = 'RANDOM';
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"calculation" must be one of [FLAT, PERCENTAGE_OF_BASE, PERCENTAGE_OF_SUBTOTAL]');
      });

      it('should require amount', () => {
        delete testReqFee.rates[0].amount;
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"amount" is required');
      });

      it('should not allow unknown properties', () => {
        testReqFee.rates[0].virus = 'not_a_virus.exe';
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"virus" is not allowed');
      });

    });

    describe('appliesTo', () => {

      it('should allow empty array for appliesTo', () => {
        testReqFee.appliesTo = [];
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.not.exist;
      });

      it('should not allow other properties in appliesTo', () => {
        testReqFee.appliesTo = [{ source: 'unitId', sourceId: '1234567', random: 'random' }];
        let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"random" is not allowed');
      });

    });

    it('should not allow unknown properties', () => {
      testReqFee.random = 'random';
      let { error } = Joi.validate(testReqFee, feesSchema.mutableFields);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"random" is not allowed');
    });

  });

  describe('mutableFieldsStrict', () => {

    it('should require name', () => {
      delete testReqFee.name;
      let { error } = Joi.validate(testReqFee, feesSchema.mutableFieldsStrict);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"name" is required');
    });

    it('should require chargeUnit', () => {
      delete testReqFee.chargeUnit;
      let { error } = Joi.validate(testReqFee, feesSchema.mutableFieldsStrict);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"chargeUnit" is required');
    });

    it('should require chargeFrequency', () => {
      delete testReqFee.chargeFrequency;
      let { error } = Joi.validate(testReqFee, feesSchema.mutableFieldsStrict);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"chargeFrequency" is required');
    });

    it('should require isTaxable', () => {
      delete testReqFee.isTaxable;
      let { error } = Joi.validate(testReqFee, feesSchema.mutableFieldsStrict);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"isTaxable" is required');
    });

    it('should require rates', () => {
      delete testReqFee.rates;
      let { error } = Joi.validate(testReqFee, feesSchema.mutableFieldsStrict);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"rates" is required');
    });

    it('should not require appliesTo', () => {
      delete testReqFee.appliesTo;
      let { error } = Joi.validate(testReqFee, feesSchema.mutableFieldsStrict);
      expect(error).to.not.exist;
    });

    it('should not require description', () => {
      delete testReqFee.description;
      let { error } = Joi.validate(testReqFee, feesSchema.mutableFieldsStrict);
      expect(error).to.not.exist;
    });

  });

  describe('allFields', () => {

    it('should require feeId', () => {
      delete testResFee.feeId;
      let { error } = Joi.validate(testResFee, feesSchema.allFields);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"feeId" is required');
    });

    it('should require pmcId', () => {
      delete testResFee.pmcId;
      let { error } = Joi.validate(testResFee, feesSchema.allFields);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"pmcId" is required');
    });

  });

  describe('summaryFields', () => {
    let feeSummary;

    beforeEach(() => {
      feeSummary = {
        feeId: testResFee.feeId,
        name: testResFee.name,
        link: 'https://test.net'
      };
    });

    it('should require feeId', () => {
      delete feeSummary.feeId;
      let { error } = Joi.validate(feeSummary, feesSchema.summaryFields);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"feeId" is required');
    });

    it('should require name', () => {
      delete feeSummary.name;
      let { error } = Joi.validate(feeSummary, feesSchema.summaryFields);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"name" is required');
    });

    it('should require link', () => {
      delete feeSummary.link;
      let { error } = Joi.validate(feeSummary, feesSchema.summaryFields);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"link" is required');
    });

  });

});
