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

  var emptyAccount = 'Счет';
  $scope.selectedAcc1 = emptyAccount;  
  $scope.selectedAcc2 = emptyAccount;  

  $('#accountName2').parent().addClass('hidden');

  $scope.entries = [
    new Entry(new Category('Еда', 'green', false), 'Столовая', 'Кошелек', '-100'),
    new Entry(new Category('Транспорт', 'yellow', false), 'Кошелек', '', '-40')
  ];

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd
  } 
  if(mm<10){
      mm='0'+mm
  } 
  var today = dd+'-'+mm+'-'+yyyy;

  $('#datepicker-md').datepicker({
    format: "dd/mm/yyyy",
    todayBtn: "linked"
  });
  $('#datepicker-md').datepicker('update', today);

  $('#datepicker').datepicker({
    format: "dd/mm/yyyy",
    todayBtn: "linked",
    orientation: "top left",
    autoclose: true
  });
  $('#datepicker').datepicker('update', today);

  $scope.getAccountState = function(account){  
    return accountStates[account];
  }

  $scope.categorySelected = function(category){
    $scope.selectedCategory = category;
    if (category.name == 'Перевод') {
      $('#accountName2').parent().removeClass('hidden');
    } else {
      $('#accountName2').parent().addClass('hidden');
    }
  }

  $scope.account1Selected = function (account) {
    $scope.selectedAcc1 = account;
    if ($scope.selectedAcc1 == $scope.selectedAcc2) {
      $scope.selectedAcc2 = emptyAccount;
    }
  }

  $scope.account2Selected = function (account) {
    $scope.selectedAcc2 = account;
  }

  $scope.notEqualAcc1 = function (account) {
    return account != $scope.selectedAcc1;
  }
}]);