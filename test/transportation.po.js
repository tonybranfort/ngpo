var ngpo = require('../lib/index.js'); 

var els = {
  transportationInput: {
    locator: by.model('client.transportation'),
    po: ngpo.makeInputPo},
  transportation: {
    locator: by.binding('client.transportation'),
    po: ngpo.makeTextPo},

}; 

var pos = ngpo.makePos(els); 

module.exports = pos; 

