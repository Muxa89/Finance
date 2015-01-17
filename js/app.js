var financeApp = angular.module('financeApp', ['ngRoute']);

financeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/balance', {
     templateUrl: 'partials/html/balance.html', 
     controller: 'BalanceController'
   })
    .otherwise({
     redirectTo: '/balance'
   });
  }]);