# ngpo
Simple template to create page objects for AngularJs Protractor tests

# I want: 
* Protractor tests as quick to write, easy to read and ignorant of the page elements as possible.
* Simple and consistent protractor page object templates which can be nested.  
* Consistent methods across applicable page objects including: 
	- getValue
	- enterValue
  - No impact to existing protractor methods  
* Simple and consistent way of accessing repeating and nested page elements. 
	- listElement.getRow(n).someElementInList
* Ability to easily incorporate other html widgets into ngpo. 
* Page Object code that's not repeated.  


# Examples 
Using [jsfiddle ngpo example](https://jsfiddle.net/tbmpls/vm6sL9zv/)

## Input, Dropdown & Button

Create a page object file of your elements using the ngpo template
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
And run your protractor test: 
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

## List

Nest your list elements as another 'els' object in your list object ('payments' here): 
```javascript
var ngpo = require('ngpo'); 

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

getRow() is the ngpo method to retrieve the row's nested page objects.  ngpo uses getRow() so as to not overwrite the get() method. 
```javascript
var clientPo = require('client.po.js');

describe('client', function() {

    it('should have working payment inputs', function() {
      expect(clientPo.payments.count()).toBe(0);

      clientPo.addPaymentButton.click();
      expect(clientPo.payments.count()).toBe(1);
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


