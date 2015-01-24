var financeApp = angular.module('financeApp', ['ngRoute'])
.directive('finSelect', function(){
  // Runs during compile
  return {
    restrict: 'A',
    link: function($scope, element, attrs, controller) {
      element.on('click', function (event) {
        $scope.$apply(attrs['finSelect']);
      });
      element.on('keydown', function (event) {
        if (event.which == 13) {
          $scope.$apply(attrs['finSelect']);
          var id = element.parent().parent().find('button')[0].id;
          $("#" + id).dropdown('toggle');
        }
      });
    }
  };
});

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