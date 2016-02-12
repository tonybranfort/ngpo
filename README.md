# ngpo - AngularJS Page Object: template and page objects

* I want my protractor tests to be as easy to write, easy to read and ignorant of the page elements as possible. 
* I want a simple and consistent protractor page object template. 
  - And I want to be able to nest page object templates
* I want consistent methods across applicable page objects including: 
	- getValue
	- enterValue
* I want a simple and consistent way of accessing repeating page elements. 
	- listElement.getRow(n).someElementInList
* I don't want code repeated that's needed to create the page objects.  
