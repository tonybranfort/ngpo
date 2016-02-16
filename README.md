# ngpo
Simple template to create page objects and helper functions for AngularJs Protractor tests.

### I want: 
* Protractor tests as quick to write, easy to read and ignorant of the page elements as possible.
* Simple and consistent protractor page objects which can be nested.  
* Consistent Protractor methods across applicable elements and html widgets including: 
	- getValue
	- enterValue
  - clear
  - No impact to existing protractor methods (unless explicitly intended)
* Simple and consistent way of accessing repeating and nested page elements. 
	- listElement.getRow(n).someElementInList
* Ability to easily incorporate other html widgets into ngpo. 
* Page Object code that's not repeated.  

## Examples 

Create a page object of Input, Dropdown & Button elements using [jsfiddle ngpo example](https://jsfiddle.net/tbmpls/vm6sL9zv/). 
```javascript
var ngpo = require('ngpo'); 

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
  typeDd: {
    locator: by.model('client.type'),
    po: ngpo.makeDdSelectPo}
};

var pos = ngpo.makePos(els); 

```
And run a protractor test with those elements.  
```javascript
var clientPo = require('client.po.js');

describe('client', function() {

    it('should allow name to be modified', function() {
      browser.get('/');

      clientPo.nameInput.enterValue('franky'); 
      expect(clientPo.nameInput.getValue()).toBe('franky'); 
      expect(clientPo.name.getValue()).toBe('franky');

      clientPo.clearNameButton.click();
      expect(clientPo.name.getValue()).toBe('');
      expect(clientPo.nameInput.getValue()).toBe('');
    });

    it('should allow client type to be selected', function() {
      clientPo.typeDd.enterValue('cranky'); 
      expect(clientPo.typeDd.getValue()).toBe('cranky'); 
      expect(clientPo.type.getValue()).toBe('cranky'); 
    });

});

```

Create a list page object using [jsfiddle ngpo example](https://jsfiddle.net/tbmpls/vm6sL9zv/).
```javascript
var ngpo = require('ngpo'); 

//Nest the list elements as another 'els' object in the list object ('payments' here): 
var els = {
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
  }
};

var pos = ngpo.makePos(els); 

```

Run the protractor test. 
```javascript
var clientPo = require('client.po.js');

describe('client', function() {

    it('should have working payment inputs', function() {
      expect(clientPo.payments.count()).toBe(0);

      clientPo.addPaymentButton.click();
      expect(clientPo.payments.count()).toBe(1);

      // getRow() is the ngpo method to retrieve the row's nested elements.  
      // ngpo uses getRow() so as to not overwrite the get() method. 
      clientPo.payments.getRow(0).amountInput.enterValue(5);
      expect(clientPo.payments.getRow(0).amountInput.getValue()).toBe('5'); 
      expect(clientPo.payments.getRow(0).amount.getValue()).toBe('5'); 
      
      clientPo.addPaymentButton.click();
      expect(clientPo.payments.count()).toBe(2);
      expect(clientPo.payments.getRow(0).amount.getValue()).toBe('5'); 
      clientPo.payments.getRow(1).amountInput.enterValue('423');
      expect(clientPo.payments.getRow(1).amountInput.getValue()).toBe('423'); 
      expect(clientPo.payments.getRow(1).amount.getValue()).toBe('423'); 

    });

});

```

See [test\test.js](https://github.com/tonybranfort/ngpo/blob/master/test/test.js) and [test\client.po.js](https://github.com/tonybranfort/ngpo/blob/master/test/client.po.js) for more examples. 


## Documentation

How to create your own _makePo_ functions: See [`makeDefaultPo`](#makeDefaultPo). 

How to create your own _makePo_ and github/npm it: See [ngpo-ui-select](https://www.npmjs.com/package/ngpo-ui-select). 

How to [nest ngpo page objects](#nesting-page-objects).

### Functions available:  
* [`makePos`](#makePos)
* [`makeDefaultPo`](#makeDefaultPo)
* [`makeTextPo`](#makeTextPo)
    - getValue
* [`makeInputPo`](#makeInputPo)
    - getValue
    - enterValue
* [`makeDateInputPo`](#makeDateInputPo)
    - getValue
    - enterValue
    - getValueMmddyyyy
    - getValueYyyymmdd
* [`makeButtonPo`](#makeButtonPo)
* [`makeButtonWithPausePo`](#makeButtonWithPausePo)
* [`makeDdSelectPo`](#makeDdSelectPo)
    - getValue
    - enterValue
* [`makeParentPo`](#makeParentPo)
    - subPo.poFn()
* [`makeListPo`](#makeListPo)
    - getRow
    - getRow(n).subPo.poFn()
    - getCount
    - getValue
* poFns  
    - clickWithPause
    - getText
    - enterValueThenTab
    - getAttributeValue
    - makeHasClassFn
* pause
* acceptAlert
* dismissAlert

<a name="makePos"></a>
#### makePos(els) 
Returns a Page Object: An object-literal of Protractor ElementFinder objects possibly with methods appended.  Methods appended are based on the els object passed in. 

`makePos` calls the function assigned to the `po` property for every object in the `els` object.  The `po` function is called with (1) the `locator` and (2) the respective els object.  

`els` is an object of the form : 
```javascript
var els {
  poName1: {
    locator: protractorLocator //  Req'd. eg; by.model('client.city')
    po: makePoFn  //Req'd. the function to append helper functions and return a protractor ElementFinder
    els: {...}    // optional nested object of same form els for list or parent pos
    fns: {fnName: function}  // optional object of custom functions that will be appended to this ElementFinder
    yourParam: value  // optional; any other parameter may be included for use in custom fns
  },
  poName2: ...
}
```

Example
```javascript
var ngpo = require('ngpo'); 

var els = {
  nameInput: {
    locator: by.model('client.name'),
    po: ngpo.makeInputPo,
    myOption: 'abc'},
};

var pos = ngpo.makePos(els); 

```

In the above example, when `makePos` is called, `makeInputPo` will be called with 
```javascript
makeInputPo(
  by.model('clientName'),
  {locator: by.model('client.name'),
   po: ngpo.makeInputPo
  myOption: 'abc'}  
)
```

And return an object with the property `nameInput` which would be a protractor ElementFinder with getValue and enterValue methods appended (from makeInputPo).  

<a name="makeDefaultPo"></a>
### makeDefaultPo(elOrLoc, options)
Returns a Protractor ElementFinder without any additional functions appended.  

Determines if `elOrLoc` is a Protractor ElementFinder or locator.  If it is a locator, creates an ElementFinder from it and returns that ElementFinder.  Otherwise, returns ElementFinder as-is. 

Every makeXxxPo function calls this function first.  Custom makeXxxPo functions should also call this function first as well which will ensure that it will work as a 'sub' PO in list and parent elements.

Example
```javascript
function myCustomPo(elOrLoc, options) {
  var el = makeDefaultPo(elOrLoc); 

  var yank = options && options.yank ? options.yank : '';   

  el.isBlada() = function() {
    return el.getAttribute('blada') === yank; 
  }

  return el; 
}

var els = {
  berl: {
    locator: by.model('something.what'),
    po: myCustomPo,
    yank: 'green'
  }
}

```

<a name="makeTextPo"></a>
### makeTextPo(elOrLoc, options)
Returns a Protractor ElementFinder with one appended function: 
  * getValue - returns element.getText()

Arguments: See [`makeDefaultPo`](#makeDefaultPo) and [`makePos`](#makePos).

Would typically be used with by.binding.  

```javascript
var ngpo = require('ngpo'); 

var els = {
  name: {
    locator: by.binding('client.name'),
    po: ngpo.makeTextPo}
};

var pos = ngpo.makePos(els); 

```

<a name="makeInputPo"></a>
### makeInputPo(elOrLoc, options)
Returns a Protractor ElementFinder for html ```<input>``` with these appended functions: 
  * getValue - returns element.getText()
  * enterValue(value) : returns ```element.click().clear().sendKeys(value).sendKeys(protractor.Key.TAB)```

Arguments: See [`makeDefaultPo`](#makeDefaultPo) and [`makePos`](#makePos).

Example
```javascript
var ngpo = require('ngpo'); 

var els = {
  nameInput: {
    locator: by.model('client.name'),
    po: ngpo.makeInputPo}
};

var clientPo = ngpo.makePos(els); 

// test example
  clientPo.nameInput.enterValue('franky'); 
  expect(clientPo.nameInput.getValue()).toBe('franky'); 

```


<a name="makeDateInputPo"></a>
### makeDateInputPo(elOrLoc, options)
Returns a Protractor ElementFinder for html ```<input type=date>``` tags with these appended functions: 
  * getValue - See [`makeInputPo`](#makeInputPo)
  * enterValue(value) - See `makeInputPo`
  * getValueMmddyyyy - getValue() as string mm/dd/yyyy format
  * getValueYyyymmdd - getValue() as string yyyy-mm-dd format

Arguments: See [`makeDefaultPo`](#makeDefaultPo) and [`makePos`](#makePos).

Example
```javascript
var ngpo = require('ngpo'); 

var els = {
  dobInput: {
    locator: by.model('client.dob'),
    po: ngpo.makeDateInputPo}
};

var clientPo = ngpo.makePos(els); 

// test example
  clientPo.dobInput.enterValue('01/01/1939'); 
  expect(clientPo.dobInput.getValue()).toBe('1939-01-01');
  expect(clientPo.dobInput.getValueMmddyyyy()).toBe('01/01/1939');

```

<a name="makeButtonPo"></a>
### makeButtonPo(elOrLoc, options)
Returns a Protractor ElementFinder with no appended functions. 

Arguments: See [`makeDefaultPo`](#makeDefaultPo) and [`makePos`](#makePos).

Example
```javascript
var ngpo = require('ngpo'); 

var els = {
  deleteCityButton: {
    locator: by.id('delete-city-button'),
    po: ngpo.makeButtonPo}
};

var clientPo = ngpo.makePos(els); 

// test example
  clientPo.deleteCityButton.click(); 

```


<a name="makeButtonWithPausePo"></a>
### makeButtonWithPausePo(elOrLoc, options)
Returns a Protractor ElementFinder with this amended function.
  - `click()` : sleeps for `options.pause` milleseconds after click()
    ```element.click().then(function() {pause(options.pause);});``` 

Arguments: See [`makeDefaultPo`](#makeDefaultPo) and [`makePos`](#makePos).

Original ElementFinder click() method is available via element.p.click(). 

Example
```javascript
var ngpo = require('ngpo'); 

var els = {
  deleteHobbyButton: {
    locator: by.id('delete-hobby-button'),
    po: ngpo.makeButtonWithPausePo,
    pause: 5000}
};

var clientPo = ngpo.makePos(els); 

// test example
  clientPo.deleteHobbyButton.click(); // pauses 5 seconds after click()

```

<a name="makeDdSelectPo"></a>
### makeDdSelectPo(elOrLoc, options)
Returns a Protractor ElementFinder for html ```<select>``` tags
with these appended functions : 
  * getValue - returns ```element.$('option:checked').getText()```
  * enterValue(value) : returns ```element.click().sendKeys(value).sendKeys(protractor.Key.TAB)```

Arguments: See [`makeDefaultPo`](#makeDefaultPo) and [`makePos`](#makePos).

Example
```javascript
var ngpo = require('ngpo'); 

var els = {
  nameInput: {
    locator: by.model('client.name'),
    po: ngpo.makeInputPo}
};

var clientPo = ngpo.makePos(els); 

// test example
  clientPo.nameInput.enterValue('franky'); 
  expect(clientPo.nameInput.getValue()).toBe('franky'); 

```

<a name="makeParentPo"></a>
### makeParentPo(elOrLoc, options)
Returns a Protractor ElementFinder which can have sub-ElementFinders on it. 

Arguments: See [`makeDefaultPo`](#makeDefaultPo) and [`makePos`](#makePos).

Example
```javascript
var ngpo = require('ngpo'); 

var els = {
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
};

var clientPo = ngpo.makePos(els); 

// test example
  clientPo.request.rInput.enterValue('be nice'); 
  expect(clientPo.request.rInput.getValue()).toBe('be nice'); 
  expect(clientPo.request.rText.getValue()).toBe('be nice'); 

```

<a name="makeListPo"></a>
### makeListPo(elOrLoc, options)
Returns a Protractor element.all object with nested protractor ElementFinders.  It has these appended functions: 
  * getRow(n) 
  * getRow(n).subPo.poFn()
  * getCount
  * getValue

Arguments: See [`makeDefaultPo`](#makeDefaultPo) and [`makePos`](#makePos).

Example
```javascript
var ngpo = require('ngpo'); 

var els = {
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
    }
};

var clientPo = ngpo.makePos(els); 

// test example
  expect(clientPo.payments.getCount()).toBe(1);
  clientPo.payments.getRow(0).amountInput.enterValue(5);
  expect(clientPo.payments.getRow(0).amountInput.getValue()).toBe('5'); 
  expect(clientPo.payments.getRow(0).amount.getValue()).toBe('5'); 

```

<a name="nesting-page-objects"></a>
### How to Nest Page Objects

Example to nest the transportation page object into a client page object. 

```javascript
// transportation.po.js
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

```

There are 2 ways to nest the above transportation page object. 
```javascript
// client.po.js
var ngpo = require('ngpo'); 
var transPo = require('./transportation.po.js');

// (1) directly in the client po els object
var els = {
  transportationParent: {
    locator: by.id('trans-parent'),
    po: ngpo.makeParentPo, 
    els: transPo.els},   
}; 

// (2) append the transportation page objects elements directly to the  client po object 
var pos = ngpo.makePos(els); 
pos = ngpo.makePos(transPo.els, pos);

```

The protractor tests would refer to these like this: 
```javascript
// #1 above would be called using transportationParent: 
  clientPo.transportationParent.transportationInput.enterValue('strides'); 
  expect(clientPo.transportationParent.transportationInput.getValue()).toBe('strides');

// #2 would allow the transportation page object elements to be called directly from the client po
  clientPo.transportationInput.enterValue('unicycle'); 
  expect(clientPo.transportationInput.getValue()).toBe('unicycle');


```
