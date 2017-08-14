var clientPo = require('./client.po.js');
var ngpo = require('../lib/index.js'); 

describe('ngpo', function() {

    it('should make a working input element', function() {
      browser.get('/');
      clientPo.nameInput.enterValue('franky'); 
      expect(clientPo.nameInput.getValue()).toBe('franky'); 
    });  

    it('should make a working text/by binding element', function() {
      expect(clientPo.name.getValue()).toBe('franky');
    });

    it('should make a working button element', function() {
      clientPo.clearNameButton.click();
      expect(clientPo.name.getValue()).toBe('');
      expect(clientPo.nameInput.getValue()).toBe('');
    });

    it('should make a working date input element', function() {
      clientPo.dobInput.enterValue('01/01/1939'); 
      expect(clientPo.dobInput.getValue()).toBe('1939-01-01');
      expect(clientPo.dob.getValue()).toContain('1939-01-01');
    });

    it('should return dates formatted correctly with getValueXxxxxxx()', function() {
      expect(clientPo.dobInput.getValueYyyymmdd()).toBe('1939-01-01');
      expect(clientPo.dobInput.getValueMmddyyyy()).toBe('01/01/1939');
    });

    it('should make a working select dropdown element', function() {
      clientPo.typeDd.enterValue('cranky'); 
      expect(clientPo.typeDd.getValue()).toBe('cranky'); 
      expect(clientPo.type.getValue()).toBe('cranky'); 
    });


    it('should make a working list element', function() {
      expect(clientPo.payments.count()).toBe(0);

      clientPo.addPaymentButton.click();
      expect(clientPo.payments.count()).toBe(1);
      expect(clientPo.payments.getCount()).toBe(1);
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

    it('should make a working parent element', function() {
      clientPo.request.rInput.enterValue('be nice'); 
      expect(clientPo.request.rInput.getValue()).toBe('be nice'); 
      expect(clientPo.request.rText.getValue()).toBe('be nice'); 
    });

    it('should append functions included in els.fns', function() {
      browser.get('/');
      expect(clientPo.hobbyInput.getClasses()).toContain('yada');
      expect(clientPo.hobbyInput.getClasses()).toContain('hocka');
      expect(clientPo.hobbyInput.getClasses()).not.toContain('bark');

      expect(clientPo.deleteHobbyButton.hasYadaClass()).toBe(true); 
      expect(clientPo.deleteHobbyButton.hasBarkClass()).toBe(false); 
      expect(clientPo.deleteHobbyButton.hasClass('yada')).toBe(true); 
      expect(clientPo.deleteHobbyButton.hasClass('bark')).toBe(false); 
    });

    it('should handle alerts', function() {
      clientPo.cityInput.enterValue('Tronxville'); 
      expect(clientPo.cityInput.getValue()).toBe('Tronxville');

      clientPo.deleteCityButton.click(); 
      ngpo.dismissAlert();
      expect(clientPo.cityInput.getValue()).toBe('Tronxville');

      clientPo.deleteCityButton.click(); 
      ngpo.acceptAlert();
      expect(clientPo.cityInput.getValue()).toBe('');

    });

    it('should allow po templates to be nested without a parent element', function() {
      // transportation is a seperate po template/file pulled into client po template
      //  with all els attached directly to client po
      clientPo.transportationInput.enterValue('unicycle'); 

      expect(clientPo.transportationInput.getValue()).toBe('unicycle');
      expect(clientPo.transportation.getValue()).toBe('unicycle');
    });


    it('should allow po templates to be nested with a parent element', function() {
      // transportation is a seperate po template/file pulled into client po template
      //   with all els as children of tra(nsParent
      clientPo.transportationParent.transportationInput.enterValue('strides'); 

      expect(clientPo.transportationParent.transportationInput.getValue())
        .toBe('strides');
      expect(clientPo.transportationParent.transportation.getValue())
        .toBe('strides');
    });

    it('should make a working button with pause allowing for pause time as option', 
      function() {
      clientPo.hobbyInput.enterValue('coloring'); 

      expect(clientPo.hobbyInput.getValue()).toBe('coloring');

      var d1 = new Date(); 
      clientPo.deleteHobbyButton.click().then(function(){
        var d2 = new Date();
        var ts = d2 - d1; 
        expect(ts).toBeGreaterThan(4999); 
      });

      expect(clientPo.hobbyInput.getValue()).toBe('');

    });

    it('should allow functions on nested elements of makeParentPos', 
      function() {
        expect(clientPo.allBoutRocks.rockInput.getClasses()).toContain('hard');
    });

    it('should allow a parents nested in a parent po', function() {
      expect(clientPo.allBoutRocks.stones.stone.getValue()).toBe('astone!');
    });

    it('should allow a list nested in a parent po', 
      function() {

      // var e = element(by.id('all-bout-rocks'));
      // var l   = by.repeater('rock in client.rocks');
      // var abr = e.all(l);

      clientPo.allBoutRocks.rockInput.enterValue('round'); 
      expect(clientPo.allBoutRocks.rockInput.getValue()).toBe('round'); 
      clientPo.allBoutRocks.addRockButton.click(); 

      clientPo.allBoutRocks.rockInput.enterValue('square'); 
      clientPo.allBoutRocks.addRockButton.click(); 

      clientPo.allBoutRocks.rockInput.enterValue('purple'); 
      clientPo.allBoutRocks.addRockButton.click()
      .then(function() {
        // expect(abr.count()).toBe(3); 
        expect(clientPo.allBoutRocks.rocks.count()).toBe(3); 
        expect(clientPo.allBoutRocks.rocks.getRow(0)
          .rock.getValue()).toBe('round'); 
        expect(clientPo.allBoutRocks.getValue()).toContain('astone');
        expect(clientPo.allBoutRocks.getValue()).toContain('round');
        expect(clientPo.allBoutRocks.getValue()).toContain('square');
        expect(clientPo.allBoutRocks.getValue()).toContain('purple');

      }); 


    });

    it('should handle isVisible for ng-show', function() {
      expect(clientPo.showme.isPresent()).toBe(true);
      expect(clientPo.showme.isDisplayed()).toBe(true);
      expect(clientPo.showme.isVisible()).toBe(true);
      clientPo.showmeButton.click()
      .then(function() {
        expect(clientPo.showme.isPresent()).toBe(true);
        expect(clientPo.showme.isDisplayed()).toBe(false);
        expect(clientPo.showme.isVisible()).toBe(false);
      });
    });

    it('should handle isVisible for ng-if', function() {
      expect(clientPo.ifme.isPresent()).toBe(true);
      expect(clientPo.ifme.isDisplayed()).toBe(true);
      expect(clientPo.ifme.isVisible()).toBe(true);
      clientPo.ifmeButton.click()
      .then(function() {
        expect(clientPo.ifme.isPresent()).toBe(false);
        expect(clientPo.ifme.isVisible()).toBe(false);
      });
    });

    it('should handle custom functions with multiple arguments', function() {
      expect(clientPo.funnyInput.getValue()).toBe('0');
      clientPo.funnyInput.inputAddedVals(3,4)
      .then(function(){
        expect(clientPo.funnyInput.getValue()).toBe('7');
      });
    });


    it('should clear text values correctly', () => {
      clientPo.nameInput.enterValue('Bobbyrama')
      .then(() => {
        expect(clientPo.nameInput.getValue()).toBe('Bobbyrama'); 
        clientPo.nameInput.clear();
        expect(clientPo.nameInput.getValue()).toBe(''); 
      }); 
    });

    it('should clear date values correctly', () => {
      clientPo.dobInput.enterValue('01/02/1952')
      .then(() => {
        expect(clientPo.dobInput.getValue()).toBe('1952-01-02');
        // clientPo.dobInput.clear() // FAILS on Chrome Protractor Issue # 562
        clientPo.dobInput.clearByBs()
        .then(() => {expect(clientPo.dobInput.getValue()).toBe('');});  
      }); 

    });

    it('should clear number values correctly', () => {
      clientPo.funnyInput.enterValue(9)
      .then(() => {
        expect(clientPo.funnyInput.getValue()).toBe('9');
        clientPo.funnyInput.clear();
        expect(clientPo.funnyInput.getValue()).toBe(''); 
      }); 

    });

    it('should clear a select dropdown correctly (select first option)', () => {
      clientPo.typeDd.enterValue('happy')
      .then(() => {
        expect(clientPo.typeDd.getValue()).toBe('happy');
        clientPo.typeDd.clear();
        expect(clientPo.typeDd.getValue()).toBe(''); 
      }); 

    });

});  // end of inner describe 
