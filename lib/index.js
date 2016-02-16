
function makePos(els, pos) {
  // if pos is included, append items to it, otherwise new object
  pos = pos || {}; 
  var poNames = Object.keys(els); 
  poNames.forEach(function (poName) {
    // the entire 'el' is passed in as "options" / 2nd parameter
    pos[poName] = 
      els[poName].po(els[poName].locator, els[poName]); 
  }); 
  pos.els = els; 
  return pos; 
} 

var poFns = {
  // common functions that *may* be attached to pos
  clickWithPause: function(el, options) {
    // return function() {
    var pauseMs = options && options.pause ? options.pause : 3000; 

    el.p = el.p ? el.p : {}; 
    el.p.click = el.click; 
    el.click = function() {
      return el.p
        .click()
        .then(function() {
          pause(pauseMs);
        });

      };
    return el; 
  },
  getText: function(el) {
    return function() {
      return el.getText(); 
    };
  },
  enterValueThenTab: function(el) {
    return function(value) {
      return el
        .click()
        .clear()
        .sendKeys(value)
        .sendKeys(protractor.Key.TAB);
    };
  },
  getAttributeValue: function(el) {
    return function() {
      return el.getAttribute('value');
    };
  },
  makeHasClassFn: function (cls) {
    //  http://stackoverflow.com/questions/20268128/how-to-test-if-an-element-has-class-using-protractor#23046060
    //  returns promise with return of true if el has class

    return function(el) {
      return el.getAttribute('class').then(function(classes) {
        return classes.split(' ').indexOf(cls) !== -1; 
      });
    };

  }

};

function isLocator(locator) {
  return locator &&
    locator.toString() !== '[object Object]' && 
      (locator.toString().substr(0,3) === 'by.' || 
       locator.toString().substr(0,3) === 'By.');
}

function attachCustomFns(el, options) {
  // attach functions from options.fns

  var fns = options && options.fns && 
      Object.prototype.toString.call(options.fns) === "[object Object]" ? 
          options.fns : {}; 

  Object.keys(fns).forEach(function(fnName) {
    el[fnName] = function() {
      return fns[fnName](el, options); 
    }; 
  });

  return el; 

}

function makeDefaultPo(elOrLoc, options) {
  // no additional methods added
  // turn into an element if locator is being passed in
  var el = isLocator(elOrLoc) ? element(elOrLoc) : elOrLoc; 

  return el; 
}

function makeTextPo(elOrLoc, options) {
  var el = makeDefaultPo(elOrLoc, options);
  el.getValue = el.getText;
  poFns.clickWithPause(el);

  return el; 
}

function makeInputPo(elOrLoc, options) {
  var el = makeDefaultPo(elOrLoc, options); 
  el.enterValue = poFns.enterValueThenTab(el);
  el.getValue = poFns.getAttributeValue(el); 

  attachCustomFns(el, options); 
  return el; 

}

function makeDateInputPo(elOrLoc, options) {
  var el = makeDefaultPo(elOrLoc, options); 

  el.enterValue = function enterValue(value) {
    return el
      .sendKeys(value)
      .sendKeys(protractor.Key.TAB);
    
  };

  el.getValue = poFns.getAttributeValue(el); 

  el.getValueMmddyyyy = function getValueMmddyyyy() {
      // returns date in mm/dd/yyyy format
      // typical date input value is returned in yyyy-mm-dd format
      return el.getAttribute('value')
      .then(getDateAsMmddyyyy); 
    };

  el.getValueYyyymmdd = function getValueYyyymmdd() {
      // returns date in yyyy-mm-dd format
      return el.getAttribute('value')
      .then(getDateAsYyyymmdd); 
    };

  attachCustomFns(el, options); 

  return el; 

}

function makeButtonPo(elOrLoc, options) {
  //yeah, no addt'l or modified functions here.  Needed? 
  //   Other than allowing it to be clear in po template that you're making a button
  var el = makeDefaultPo(elOrLoc, options); 

  attachCustomFns(el, options); 

  return el; 
}

function makeButtonWithPausePo(elOrLoc, options) {
  var el = makeDefaultPo(elOrLoc, options); 

  poFns.clickWithPause(el, options);

  attachCustomFns(el, options); 

  return el; 
}

function makeDdSelectPo(elOrLoc, options) {
  var el = makeDefaultPo(elOrLoc, options); 

  // <select ng-model="derivative.type" 
  //   ng-options="type as type for type in meta.client.derivative_type.values" >
  // </select>
  // locator = "by.model("derivative.type")"

  el.enterValue = function(value) {
    //http://stackoverflow.com/questions/31055349/testing-with-protractor-using-ui-select
    //https://github.com/angular-ui/ui-select/issues/270
    el.click();
    return el
      .sendKeys(value)
      .sendKeys(protractor.Key.TAB);
  };

  el.getValue = function() {
    return el.$('option:checked').getText();
  };

  attachCustomFns(el, options); 

  return el; 

}

function makeListPo(elOrLoc, options) {
  // creates an list page object // array element finder
  //   if a locator is passed in
  // If getRow is called for this object, it will 'attach' each 
  //   element finder that is listed in the 'els' object
  // So this (element w/in a list w/in a list): 
  //     element.all(by.repeater('task in vm.tasklist'))
  //     .get(0)
  //     .all(by.id('task-clients'))
  //     .get(1)
  //     .element(by.binding('client.name.last'))
  //     .getText()
  // Becomes
  //      TaskListPo
  //      .taskList.getRow(0)
  //      .clientList.getRow(1)
  //      .lastName.getValue()
  // Using a page-object template like this: 
     // var els = {
     //   taskList: {
     //     locator: by.repeater('task in vm.taskList'),
     //     po: poShared.makeListPo,
     //     els: {
     //       clientList: {
     //         locator: by.binding('client.name.display'),
     //         po: poShared.makeListPo, 
     //         els: {
     //           nameLast: {
     //             locator: by.binding('client.name.display'),
     //             po: poShared.makeTextPo,
     //           }     
     //         }     
     //       }    
     //     }
     //   }
     // };


  var el = isLocator(elOrLoc) ? element.all(elOrLoc) : elOrLoc; 

  // 'els' are the elements within the list (columns), if any
  var els = options && options.els ? options.els : []; 

  var attachFns = function(el) {
    el = makeDefaultPo(el);
    el.getCount = el.count; 
    el.getValue = el.getText;
    el.getFirstItem = function() {return el.get(0);};
    el.getItem = function(index) {return el.get(index);};
    attachGetRowFn(el); 
    attachCustomFns(el, options);
    return el; 
  };

  function attachGetRowFn(el) {
    // getRow attaches each element that's defined in the els sub-object
    el.getRow = function(index) {
        var row = el.get(index); 
        // attach each row element to the row  
        row = attachFns(row);
        var elsNames = Object.keys(els); 
        for (var i = elsNames.length - 1; i >= 0; i--) {
          var thisEl;
          // if a list within a list, then row.all otherwise row.element
          if (els[elsNames[i]].po.name === 'makeListPo') {
            thisEl = row.all(els[elsNames[i]].locator);
          } else {
            thisEl = row.element(els[elsNames[i]].locator);
          }
          thisEl = els[elsNames[i]].po(thisEl, els[elsNames[i]].els );
          row[elsNames[i]] = thisEl;
        }
        // row.getValue = function() {return 'halj';};
        return row; 
    };
    return el; 
  }

  el = attachFns(el);  

  el.attachFns = attachFns; 

  return el; 

}

function makeParentPo(elOrLoc, options) {
  //same as makeListPo except no rows - just sub-elements

  var el = makeDefaultPo(elOrLoc, options); 

  // 'els' are the elements within the list (columns), if any
  var els = options && options.els ? options.els : []; 

  // want to return : 
  //  parent (element)
  //     .sub1   (element create as por)
  //     .sub2...
  // so that when 'parent.sub1.click()' is called it is the equivalent of
  //     element(parentlocator).element(sub1locator).click()
  //        eg; element(by.id('parent')).element(by.id('sub1')).click()

  var elsNames = Object.keys(els); 
  for (var i = elsNames.length - 1; i >= 0; i--) {
    var subPoName = elsNames[i];
    el[subPoName] = el.element(els[subPoName].locator); 
    el[subPoName] = els[subPoName].po(el[subPoName]);  //add the custom fns
  }  

  attachCustomFns(el, options);

  return el; 

}

function getDateAsYyyymmdd(d) {
  d = typeof d === 'string' ? d + " 12:00" : d; 
  var newD = new Date(d);
  if (newD.getFullYear()) {
    return newD.getFullYear() +
    "-" +
    ("0" + (newD.getMonth()+1)).slice(-2) +
    "-" + 
    ("0" + newD.getDate()).slice(-2);  
  } else {
    return 'bad date'; 
  }
}

function getDateAsMmddyyyy(d) {
  // put time as 12:00 to prevent gmt offset 
  d = typeof d === 'string' ? d + " 12:00" : d; 
  var newD = new Date(d);
  if (newD.getFullYear()) {
    return ("0" + (newD.getMonth()+1)).slice(-2) +
      "/" +
      ("0" + (newD.getDate())).slice(-2) + 
      "/" +
      newD.getFullYear();   
  } else {
    return 'bad date'; 
  } 
}

function dismissAlert() {
    //http://stackoverflow.com/questions/25041270/protractor-dismiss-alerts-if-open
  return browser.switchTo().alert().then(
      function (alert) { alert.dismiss(); },
      function (err) { }
  );  
}

function acceptAlert() {
    //http://stackoverflow.com/questions/25041270/protractor-dismiss-alerts-if-open
  return browser.switchTo().alert().then(
      function (alert) { alert.accept(); },
      function (err) { }
  );  
}

function pause(ms) {
  browser.sleep(ms); 
}

module.exports = {
  makePos: makePos,
  makeDefaultPo: makeDefaultPo, 
  makeButtonPo: makeButtonPo, 
  makeButtonWithPausePo: makeButtonWithPausePo, 
  makeInputPo: makeInputPo,
  makeParentPo : makeParentPo, 
  makeDdSelectPo: makeDdSelectPo,
  makeDateInputPo: makeDateInputPo,
  makeListPo: makeListPo,
  makeTextPo: makeTextPo,
  poFns: poFns,
  getDateAsMmddyyyy: getDateAsMmddyyyy,
  getDateAsYyyymmdd: getDateAsYyyymmdd,
  acceptAlert: acceptAlert,
  dismissAlert: dismissAlert, 
  pause: pause,
};
