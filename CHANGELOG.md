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


