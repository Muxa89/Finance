var financeApp = angular.module('financeApp');

function Entry (category, description, account, sum) {
  this.category = category;
  this.description = description;
  this.account = account;
  this.sum = sum;
}

function Category (name, color, isSpecial) {
  this.name = name;
  this.color = color; 
  this.isSpecial = isSpecial;
}

Category.loadSpecialCategories = function() {
  return [
    new Category('Стартовый баланс', 'gray', true),
    new Category('Перевод', 'gray', true),
    new Category('Корректировка', 'gray', true)
  ];
}

function loadCategories() {
  return [
    new Category('Еда', 'green', false),
    new Category('Медицина', 'red', false),
    new Category('Квартира', 'blue', false),
    new Category('Транспорт', 'yellow', false)
  ].concat(Category.loadSpecialCategories());
}

financeApp.controller('BalanceController' , ['$scope', function ($scope) {
  accountStates = {'Карточка':1000, 'Кошелек':2000, 'Домашние наличные':3000};
  $scope.accounts = [];
  for (var name in accountStates) {
    $scope.accounts.push(name);
  }

  $scope.categories = loadCategories();
  var emptyCategory = new Category('Категория', '', '');
  $scope.selectedCategory = emptyCategory;

  $scope.entries = [
    new Entry(new Category('Еда', 'green', false), 'Столовая', 'Кошелек', '-100'),
    new Entry(new Category('Транспорт', 'yellow', false), 'Кошелек', '', '-40')
  ];

  $('#datepicker-md').datepicker({
    format: "dd/mm/yyyy",
    todayBtn: true
  });

  $('#datepicker').datepicker({
    format: "dd/mm/yyyy",
    todayBtn: true,
    orientation: "top left",
    autoclose: true
  });

  $scope.getAccountState = function(account){  
    return accountStates[account];
  }

  $scope.categoryKeydown = function (category, $event) {
    if ($event.which == 13) {
      $scope.categorySelected(category);
    }
  }

  $scope.categorySelected = function(category){
    $scope.selectedCategory = category;
    $("#categoryDd").dropdown('toggle');
  }
}]);