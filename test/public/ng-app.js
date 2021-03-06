var ngApp = angular.module('ngApp',[])
  .controller('MyCtrl', MyCtrl);

function MyCtrl($scope) {
  $scope.client = 
      {name: undefined,
       dob: undefined,
       request: undefined,
       funny: 0,
       rocks: []};

  $scope.clearClientName = function() {
    $scope.client.name = '';
  };

  $scope.clientTypes = [
    'cranky',
    'happy',
    'loaded',
    'zenish',
    'sp acy  '
  ];

  $scope.payments = [
    // {date: '01/01/2014',
    //  amount: '5'},
    // {date: '02/15/2014',
    //  amount: '1'},
    // {date: '03/18/2015',
    //  amount: '17'},
  ];

  $scope.showit = true; 
  $scope.ifit = true; 

  $scope.addRock = function(rock) {
    $scope.client.rocks.push(rock); 
  };

  $scope.addPayment = function() {
    $scope.payments.push({date:'', amount: ''});
  }; 

  $scope.deleteCity = function() {
    var okToDelete = confirm("OK to delete the city?"); 
    if(okToDelete) {
      $scope.client.city = '';
    } 
  };

  $scope.deleteHobby = function() {
    $scope.client.hobby = '';
  };

  $scope.toggleShowMe = function() {
    $scope.showit = !$scope.showit; 
  };

  $scope.toggleIfMe = function() {
    $scope.ifit = !$scope.ifit; 
  };

}
