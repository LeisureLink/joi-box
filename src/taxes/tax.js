import Joi from 'joi';

export default Joi.object({
  name: Joi.string ().required ().trim ().description ('Name of the fee'),
  description: Joi.string ().optional ().trim (),
  chargeUnit: Joi.string ().required ().trim ().uppercase ().valid (['PERSON', 'ROOM']),
  chargeFrequency: Joi.string ().required ().trim ().uppercase ().valid (['NIGHT', 'STAY']),
  isTaxable: Joi.boolean ().required (),

  // Rates
  rates: Joi.array ().min (1).items (Joi.object ({
    name: Joi.string ().trim (),
    calculation: Joi.string ().required ().trim ().uppercase ().valid (['FLAT', 'PERCENTAGE_OF_BASE', 'PERCENTAGE_OF_SUBTOTAL']),
    amount: Joi.number ().positive (),
    applicability: Joi.object ({
      begin: Joi.date ().optional (),
      end: Joi.date ().optional ()
    })
  })),

  // Applies To
  appliesTo: Joi.array ().items (Joi.object ({
    unitId: Joi.string ().required ().trim ()
  }))
});