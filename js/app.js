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

financeApp.factory('accountsService', ['idGenerator', function (idGenerator) {
  var entityManager = createEntityManager(idGenerator);

  var emptyAccount = undefined;
  entityManager.getEmptyAccount = function () {
    if (!emptyAccount) emptyAccount = new Account("Счет", 0);
    emptyAccount.id = -1;
    return emptyAccount;
  }

  return entityManager;
}]);

financeApp.factory('categoryService', ['idGenerator', function (idGenerator) {
  var entityManager = createEntityManager(idGenerator);

  var emptyCategory = undefined;
  entityManager.getEmptyCategory = function () {
    if (!emptyCategory) emptyCategory = new Category("Категория", "", true);
    emptyCategory.id = -1;
    return emptyCategory;
  }

  return entityManager;
}]);

financeApp.factory('entryService', ['idGenerator', 'categoryService', 'accountsService',function (idGenerator, categoryService, accountsService) {
  var entityManager = createEntityManager(idGenerator);

  var emptyEntry = undefined;
  entityManager.getEmptyEntry = function () {
    if (!emptyEntry) emptyEntry = new Entry("", categoryService.getEmptyCategory(), accountsService.getEmptyAccount(), accountsService.getEmptyAccount(), "", 0);
    emptyEntry.id = -1;
    return emptyEntry;
  }

  return entityManager;
}]);

function createEntityManager (idGenerator) {
  var storage = [];

  function isEmpty (filter) {
    for(var prop in filter) {
      if (filter.hasOwnProperty(prop)) {
        return false;    
      }
    }
    return true;
  };

  function getEntityById (entityId) {
    return getEntities({id : entityId});
  };

  function getEntities (filter) {
    if (isEmpty(filter)) return storage;

    var result = [];
    for (var i = 0; i < storage.length; i++) {
      var isAppropriate = true;
      for (var prop in filter) {
        if (!filter.hasOwnProperty(prop)) continue;
        if (storage[i][prop] != filter[prop]) {
          isAppropriate = false;
          break;
        }
      }
      if (isAppropriate) {
        result.push(storage[i]);
      }
    };
    if (result.length == 1) return result[0];
    return result;
  }
  
  return {
    add:function (entity) {
      entity.id = idGenerator.nextId();
      storage.push(entity); 
    },
    replace:function (modifiedEntity) {
      storage.remove(getEntityById(modifiedEntity.id));
      storage.push(modifiedEntity);
    },
    delete:function (id) {
      storage.remove(getEntityById(id));
    },
    get:function (filter) {
      return getEntities(filter);
    }
  }
}

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


