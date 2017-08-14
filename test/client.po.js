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
    po: ngpo.makeDateInputPo,
    fns: {clearByBs: ngpo.poFns.clearByBs}},
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
    els: transPo.els},
  deleteHobbyButton: {
    locator: by.id('delete-hobby-button'),
    po: ngpo.makeButtonWithPausePo,
    pause: 5000,
    fns: {
      hasClass: ngpo.poFns.hasClass,
      hasYadaClass: ngpo.poFns.makeHasClassFn('yada'),
      hasBarkClass: ngpo.poFns.makeHasClassFn('bark')}
    },
  hobbyInput: {
    locator: by.model('client.hobby'),
    po: ngpo.makeInputPo,
    fns: {
      getClasses: function(el, options) {return el.getAttribute('class');}
    }},
  showme: {
    locator: by.id('showme'),
    po: ngpo.makeTextPo},
  ifme: {
    locator: by.id('ifme'),
    po: ngpo.makeTextPo},
  showmeButton: {
    locator: by.id('showme-button'),
    po: ngpo.makeButtonPo},
  ifmeButton: {
    locator: by.id('ifme-button'),
    po: ngpo.makeButtonPo},
  funnyInput: {
    locator: by.model('client.funny'),
    po: ngpo.makeInputPo,
    fns: {
      clearByBs: ngpo.poFns.clearByBs,
      inputAddedVals: (funnyInputEl, options, val1, val2) => {
        var addedVals = val1 + val2; 
        return funnyInputEl.enterValue(addedVals);
      }
    }
  },
  allBoutRocks: {
    locator: by.id('all-bout-rocks'),
    po: ngpo.makeParentPo,
    els: {
      rockInput: {
        locator: by.model('client.rock'),
        po: ngpo.makeInputPo,
        fns: {
          getClasses: function(el, options) {return el.getAttribute('class');},
        }
      },
      addRockButton: {
        locator: by.id('add-rock-button'),
        po: ngpo.makeButtonPo
      },
      stones: {
        locator: by.id('stones'),
        po: ngpo.makeParentPo,
        els: {
          stone: {
            locator: by.id('stone'),
            po: ngpo.makeTextPo
          }
        }
      },
      rocks: {
        locator: by.repeater('rock in client.rocks'),
        po: ngpo.makeListPo,
        els: {
          rock: {
            locator: by.binding('rock'),
            po: ngpo.makeTextPo
          }
        }
      }
    }
  }

}; 

var pos = ngpo.makePos(els); 
pos = ngpo.makePos(transPo.els, pos);

module.exports = pos; 

