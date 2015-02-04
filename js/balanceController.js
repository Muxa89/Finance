var financeApp = angular.module('financeApp');

function Entry (category, description, acc1, acc2, sum) {
  this.category = category;
  this.acc1 = acc1;
  this.acc2 = acc2;
  this.description = description;
  this.sum = sum;
}

function Category (name, color, isSpecial) {
  this.name = name;
  this.color = color; 
  this.isSpecial = isSpecial;
}

function AccountStore () {
  this.accounts = {};

  AccountStore.addAccount = function (name, startState) {
    accounts[name] = startState;
  }
 
  AccountStore.addAccount('Карточка', 0);
  AccountStore.addAccount('Кошелек', 0);
  AccountStore.addAccount('Домашние наличные', 0);

  AccountStore.getAccounts = function () {
    return accounts;
  }
}

Category.loadSpecialCategories = function() {
  return [
    new Category('Стартовый баланс', 'gray', true),
    new Category('Перевод', 'gray', true),
    new Category('Корректировка', 'gray', true)
  ];
}

Category.getCategoryByName = function (name) {
  if (!Category.categoriesLoaded) loadCategories();
  return Category[name];
}

function loadCategories() {
  var allCategories = [
    new Category('Еда', 'green', false),
    new Category('Медицина', 'red', false),
    new Category('Квартира', 'blue', false),
    new Category('Транспорт', 'yellow', false)
  ].concat(Category.loadSpecialCategories());
  for (var i = 0; i < allCategories.length; i++) {
    Category[allCategories[i].name] = allCategories[i];
  }
  Category.categoriesLoaded = true;
  return allCategories;
}

function loadAccounts () {
  
}

function getRandomIntNumber (max, min) {
  if (!min) min = 0;
  return min + Math.round(Math.random()*max);
}

function loadEntries (amount) {
  var result = [];
  var categories = loadCategories();
  for (var i = 0; i < amount; i++) {
    // result.push(new Entry(
    //   categories[getRandomIntNumber(categories.length)]

    // ));
  }
  return result;
}

financeApp.controller('BalanceController', ['$scope', 'entryService', function ($scope, entryService) {
  (function init () {
    // Datepicker init

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

    // Тестовые записи
    entryService.add(today, "Еда", "Кошелек", "", "Столовая", -100);
    entryService.add(today, "Перевод", "Зп карточка", "Кошелек", "", -200);
    entryService.add(today, "Транспорт", "Кошелек", "", "", -20);
  })();

  $scope.accounts = ["Кошелек", "Карта", "Домашние наличные"];
  // for (var name in AccountStore.getAccounts()) {
  //   $scope.accounts.push(name);
  // }

  $scope.categories = loadCategories();
  var emptyCategory = new Category('Категория', '', '');
  $scope.selectedCategory = emptyCategory;

  var emptyAccount = 'Счет';
  $scope.selectedAcc1 = emptyAccount;  
  $scope.selectedAcc2 = emptyAccount;  

  $('#accountName2').parent().addClass('hidden');

  // $scope.entries = [
  //   new Entry(new Category('Еда', 'green', false), 'Столовая', 'Кошелек', '-100'),
  //   new Entry(new Category('Транспорт', 'yellow', false), 'Кошелек', '', '-40')
  // ];
  $scope.entries = entryService.get();




  $scope.getAccountState = function(account){  
    return 100;
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

  $scope.addEntry = function () {
    entryService.add($('#datepicker').val(), $scope.selectedCategory.name, $scope.selectedAcc1, $scope.selectedAcc2, $scope.description, $scope.sum);
    refreshTable();
  }

  $scope.selectEntry = function (entry, event) {
    clearSelection();
    entry.selected = true;
  }

  function clearSelection () {
    $(".entry-table-row").removeClass("selected");
    for (var i = 0; i < $scope.entries.length; i++) {
      $scope.entries[i].selected = false;
    };
  }

  function refreshTable () {
    $scope.entries = entryService.get();
  }
}]);