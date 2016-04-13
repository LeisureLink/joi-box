import _ from 'lodash';
import { expect } from 'chai';
import Joi from 'joi';

import mockPmcReq from './pmc.req';
import mockPmcRes from './pmc.res';
import pmcSchema from '../../src/pmc/pmc';

describe('pmc schema validation', () => {
  let testReqPmc;
  let testResPmc;

  beforeEach(() => {
    testReqPmc = _.cloneDeep(mockPmcReq);
    testResPmc = _.cloneDeep(mockPmcRes);
  });

  describe('mutableFields', () => {

    describe('name', () => {

      it('should not allow name to be a number', () => {
        testReqPmc.name = 123;
        let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"name" must be a string');
      });

      it('should not allow name to be an empty string', () => {
        testReqPmc.name = '';
        let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"name" is not allowed to be empty');
      });

    });

    describe('phoneNumber', () => {

      it('should not allow characters other than numbers for countryCode', () => {
        testReqPmc.phoneNumber.countryCode = '+1';
        let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"countryCode"').and.to.have.string('fails to match the required pattern');
      });

      it('should not allow character other than numbers for main number', () => {
        testReqPmc.phoneNumber.mainNumber = '800-867-5309';
        let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"mainNumber"').and.to.have.string('fails to match the required pattern');
      });

      it('should allow all number strings', () => {
        let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFields);
        expect(error).to.not.exist;
      });

    });

    describe('reservationPhoneNumber', () => {

      it('should not allow characters other than numbers for countryCode', () => {
        testReqPmc.reservationPhoneNumber.countryCode = '+1';
        let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"countryCode"').and.to.have.string('fails to match the required pattern');
      });

      it('should not allow character other than numbers for main number', () => {
        testReqPmc.reservationPhoneNumber.mainNumber = '800-867-5309';
        let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"mainNumber"').and.to.have.string('fails to match the required pattern');
      });

      it('should allow all number strings', () => {
        let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFields);
        expect(error).to.not.exist;
      });

    });

    describe('emailAddress', () => {

      it('should not allow email to be empty', () => {
        testReqPmc.emailAddress = '';
        let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"emailAddress" is not allowed to be empty');
      });

      it('should not allow a non-email string', () => {
        testReqPmc.emailAddress = 'obviously not an email';
        let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"emailAddress" must be a valid email');
      });

      it('should allow email strings', () => {
        testReqPmc.emailAddress = 'obviously.an@email.net';
        let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFields);
        expect(error).to.not.exist;
      });

    });

    describe('websiteUrl', () => {

      it('should not allow an empty string', () => {
        testReqPmc.websiteUrl = '';
        let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"websiteUrl" is not allowed to be empty');
      });

      it('should not allow a normal format string', () => {
        testReqPmc.websiteUrl = 'obviously not a valid uri';
        let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFields);
        expect(error).to.exist;
        expect(error.toString()).to.have.string('"websiteUrl" must be a valid uri');
      });

      it('should allow a uri string', () => {
        let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFields);
        expect(error).to.not.exist;
      });

    });

    it('should not allow unknown properties', () => {
      testReqPmc.random = 'random';
      let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFields);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"random" is not allowed');
    });

  });

  describe('mutableFieldsStrict', () => {

    it('should require name', () => {
      delete testReqPmc.name;
      let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFieldsStrict);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"name" is required');
    });

    it('should require phoneNumber', () => {
      delete testReqPmc.phoneNumber;
      let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFieldsStrict);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"phoneNumber" is required');
    });

    it('should require reservationPhoneNumber', () => {
      delete testReqPmc.reservationPhoneNumber;
      let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFieldsStrict);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"reservationPhoneNumber" is required');
    });

    it('should require emailAddress', () => {
      delete testReqPmc.emailAddress;
      let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFieldsStrict);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"emailAddress" is required');
    });

    it('should not required websiteUrl', () => {
      delete testReqPmc.websiteUrl;
      let { error } = Joi.validate(testReqPmc, pmcSchema.mutableFieldsStrict);
      expect(error).to.not.exist;
    });

  });

  describe('allFields', () => {

    it('should require pmcId', () => {
      delete testResPmc.pmcId;
      let { error } = Joi.validate(testResPmc, pmcSchema.allFields);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"pmcId" is required');
    });

    it('should allow phoneNumber.mainNumber to be an empty string', () => {
      testResPmc.phoneNumber.mainNumber = '';
      let { error } = Joi.validate(testResPmc, pmcSchema.allFields);
      expect(error).to.not.exist;
    });

    it('should allow reservationPhoneNumber.mainNumber to be an empty string', () => {
      testResPmc.reservationPhoneNumber.mainNumber = '';
      let { error } = Joi.validate(testResPmc, pmcSchema.allFields);
      expect(error).to.not.exist;
    });

  });

  describe('summaryFields', () => {
    let pmcSummary;

    beforeEach(() => {
      pmcSummary = {
        pmcId: testResPmc.pmcId,
        name: testResPmc.name,
        link: testResPmc.websiteUrl
      };
    });

    it('should require pmcId', () => {
      delete pmcSummary.pmcId;
      let { error } = Joi.validate(pmcSummary, pmcSchema.summaryFields);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"pmcId" is required');
    });

    it('should require name', () => {
      delete pmcSummary.name;
      let { error } = Joi.validate(pmcSummary, pmcSchema.summaryFields);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"name" is required');
    });

    it('should require link', () => {
      delete pmcSummary.link;
      let { error } = Joi.validate(pmcSummary, pmcSchema.summaryFields);
      expect(error).to.exist;
      expect(error.toString()).to.have.string('"link" is required');
    });

  });
});
