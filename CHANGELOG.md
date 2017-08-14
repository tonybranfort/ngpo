# v2.2.0
- feat: Add `clear` function to element returned from makeDdSelectPo; selects the first item in the dropdown select.  
- feat: Add `poFns.hasClass` function.  Available as custom function.  Resolves to `true` if className parameter is a classname on the element; eg  `expect(clientPo.deleteHobbyButton.hasClass('yada')).toBe(true)` See [How to append custom functions](https://github.com/tonybranfort/ngpo#custom-fns). 
- fix: `poFns.clearByBs` didn't return a promise.
- Deprecating `makeButtonWithPausePo` and `poFns.clickWithPause` function. 
- docs: Updated for above and other minor updates

# v2.1.0
- feat: Add `poFns.clearByBs` function.  Use to clear a date field in Chrome.  See Protractor Issue [#562](https://github.com/angular/protractor/issues/562).  See example in ngpo readme [How to append custom functions](https://github.com/tonybranfort/ngpo#custom-fns)

# v2.0.0
- feat: Allow arguments to custom functions.
- Breaking changes: There are no breaking changes to the ngpo api but v6.x or greater of nodejs is required for ngpo v2.x.  

# v1.2.0
- feat: Add 'isVisible' function. Issue #4. Returns true (in promise) if el.isPresent() and el.isDisplayed().

# v1.1.0
- feat: Add 'getValue' function to parentPo (result from makeParentPo()).  Issue #3.  parentPo getValue() returns full text value of all children.  See test/test.js clientPo.allBoutRocks.getValue() for example. 

# v1.0.4
- Fix to work with Protractor v5.1 (test of locator failed; might have also failed in Protractor versions 4.x &/or 3.x). 
- No breaking changes

# v1.0.3
- Fix to makeParentPo

# v1.0.2
- Fix Issue #1: Custom functions are not being attached to po if it is sub-element of 'makeParentPo'
- Fix Issue #2: makeListPo elements cannot be nested within makeParentPo

# v1.0.1
- Allow custom functions to be included in page object via els `fns` property 
- Update README to include documentation for ngpo functions

# v1.0.0 
- Initial version


