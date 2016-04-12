export default {
  'name': 'Mock Fee',
  'description': 'here is a description',
  'rates': [
    {
      'name': 'First year',
      'amount': 10,
      'calculation': 'PERCENTAGE_OF_SUBTOTAL',
      'applicability': {
        'begin': '2015-11-27',
        'end': '2016-06-21'
      }
    }
  ],
  'chargeFrequency': 'NIGHT',
  'chargeUnit': 'ROOM',
  'isTaxable': false
};
