var ngpo = require('../lib/index.js'); 
var transPo = require('./transportation.po.js');

var els = {
  nameInput: {
    locator: by.model('client.name'),
    po: ngpo.makeInputPo},
  name: {
    locator: by.binding('client.name'),
    po: ngpo.makeTextPo},
  clearNameButton: {
    locator: by.id('clear-name-button'),
    po: ngpo.makeButtonPo},
  dobInput: {
    locator: by.model('client.dob'),
    po: ngpo.makeDateInputPo},
  dob: {
    locator: by.binding('client.dob'),
    po: ngpo.makeTextPo},
  typeDd: {
    locator: by.model('client.type'),
    po: ngpo.makeDdSelectPo},
  type: {
    locator: by.binding('client.type'),
    po: ngpo.makeTextPo},
  addPaymentButton: {
    locator: by.id('add-payment-button'),
    po: ngpo.makeButtonPo},
  payments: {
    locator: by.repeater('payment in payments'),
    po: ngpo.makeListPo,
    els: {
      amountInput: {
        locator: by.model('payment.amount'),
        po: ngpo.makeInputPo},
      amount: {
        locator: by.binding('payment.amount'),
        po: ngpo.makeTextPo},
    },
  },
  request: {
    locator: by.id('request'),
    po: ngpo.makeParentPo,
    els: {
      rInput: {
        locator: by.model('client.request'),
        po: ngpo.makeInputPo},
      rText: {
        locator: by.binding('client.request'),
        po: ngpo.makeTextPo},
    }
  },
  cityInput: {
    locator: by.model('client.city'),
    po: ngpo.makeInputPo},
  deleteCityButton: {
    locator: by.id('delete-city-button'),
    po: ngpo.makeButtonPo},
  transportationParent: {
    locator: by.id('trans-parent'),
    po: ngpo.makeParentPo, 
    els: transPo.els
  }

}; 

var pos = ngpo.makePos(els); 
pos = ngpo.makePos(transPo.els, pos);

module.exports = pos; 

