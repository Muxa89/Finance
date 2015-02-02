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

financeApp.factory('idGenerator', function () {
  var id = 1;
  return {
    nextId:function () {
      return id++;
    }
  }
});

financeApp.factory('entryService', ['idGenerator', function (idGenerator) {
  var entryStorage = [];

  function Entry (id, date, category, acc1, acc2, description, sum) {
    this.id = id;
    this.date = date;
    this.category = category;
    this.acc1 = acc1;
    this.acc2 = acc2;
    this.description = description;
    this.sum = sum;
  }

  function getEntryById (id) {
    for (var i = 0; i < entryStorage.length; i++) {
      if (entryStorage[i].id == id) {
        return entryStorage[i];
      }
    };
  }

  return {
    add:function (date, category, acc1, acc2, description, sum) {
      entryStorage.push(new Entry(idGenerator.nextId(), date, category, acc1, acc2, description, sum));
    },
    modify:function (modifiedEntry) {
      entryStorage.remove(getEntryById(modifiedEntry.id));
      entryStorage.push(modifiedEntry);
    },
    delete:function (id) {
      entryStorage.remove(id);
    },
    get:function (filter) {
      if (!filter) return entryStorage;

      var result = [];
      for (var i = 0; i < entryStorage.length; i++) {
        var isAppropriate = true;
        for (var prop in filter) {
          if (!object.hasOwnProperty(prop)) continue;
          if (entryStorage[i][prop] != filter[prop]) {
            isAppropriate = false;
            break;
          }
        }
        if (isAppropriate) {
          result.push(entryStorage[i]);
        }
      };
      return result;
    }
  };
}]);

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};