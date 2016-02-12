var testPo = require('./test.po.js');
var ngpo = require('../lib/index.js'); 

describe('ngpo', function() {

    it('should make a working input element', function() {
      browser.get('/');
      testPo.nameInput.enterValue('franky'); 
      expect(testPo.nameInput.getValue()).toBe('franky'); 
    });  

    it('should make a working text/by binding element', function() {
      expect(testPo.name.getValue()).toBe('franky');
    });

    it('should make a working button element', function() {
      testPo.clearNameButton.click();
      expect(testPo.name.getValue()).toBe('');
      expect(testPo.nameInput.getValue()).toBe('');
    });

    it('should make a working date input element', function() {
      testPo.dobInput.enterValue('01/01/1939'); 
      expect(testPo.dobInput.getValue()).toBe('1939-01-01');
      expect(testPo.dob.getValue()).toContain('1939-01-01');
    });

    it('should return dates formatted correctly with getValueXxxxxxx()', function() {
      expect(testPo.dobInput.getValueYyyymmdd()).toBe('1939-01-01');
      expect(testPo.dobInput.getValueMmddyyyy()).toBe('01/01/1939');
    });

    it('should make a working select dropdown element', function() {
      testPo.typeDd.enterValue('cranky'); 
      expect(testPo.typeDd.getValue()).toBe('cranky'); 
      expect(testPo.type.getValue()).toBe('cranky'); 
    });

    it('should make a working list element', function() {
      expect(testPo.payments.count()).toBe(0);

      testPo.addPaymentButton.click();
      expect(testPo.payments.count()).toBe(1);
      testPo.payments.getRow(0).amountInput.enterValue(5);
      expect(testPo.payments.getRow(0).amountInput.getValue()).toBe('5'); 
      expect(testPo.payments.getRow(0).amount.getValue()).toBe('5'); 
      
      testPo.addPaymentButton.click();
      expect(testPo.payments.count()).toBe(2);
      expect(testPo.payments.getRow(0).amount.getValue()).toBe('5'); 
      testPo.payments.getRow(1).amountInput.enterValue('423');
      expect(testPo.payments.getRow(1).amountInput.getValue()).toBe('423'); 
      expect(testPo.payments.getRow(1).amount.getValue()).toBe('423'); 

    });

    it('should make a working parent element', function() {
      testPo.request.rInput.enterValue('be nice'); 
      expect(testPo.request.rInput.getValue()).toBe('be nice'); 
      expect(testPo.request.rText.getValue()).toBe('be nice'); 
    });

    it('should handle alerts', function() {
      testPo.cityInput.enterValue('Tronxville'); 
      expect(testPo.cityInput.getValue()).toBe('Tronxville');

      testPo.deleteCityButton.click(); 
      ngpo.dismissAlert();
      expect(testPo.cityInput.getValue()).toBe('Tronxville');

      testPo.deleteCityButton.click(); 
      ngpo.acceptAlert();
      expect(testPo.cityInput.getValue()).toBe('');

    });


});  // end of inner describe 
