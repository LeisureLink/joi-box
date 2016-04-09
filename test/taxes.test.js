import taxes from '../src/taxes';
import { expect } from 'chai';

describe('Tax Schemas', () => {

  describe('Tax', () => {
    it('should expose a Joi Object', () => {
      expect(taxes.tax.isJoi).to.be.true;
    });
  });

});
