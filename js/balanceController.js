var financeApp = angular.module('financeApp');

financeApp.controller('BalanceController', ['$scope', 'entryService', 'categoryService', 'accountsService', function ($scope, entryService, categoryService, accountsService) {
  (function init () {
    // datepicker
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
    $scope.acc2Visible = false;
    $scope.isEditButtonsVisible = false;

    $scope.entryModified = false;

    // Тестовые записи
    categoryService.add(new Category('Стартовый баланс', 'gray', true));
    categoryService.add(new Category('Перевод', 'gray', true));
    categoryService.add(new Category('Корректировка', 'gray', true));
    categoryService.add(new Category('Еда', 'green', false));
    categoryService.add(new Category('Медицина', 'red', false));
    categoryService.add(new Category('Квартира', 'blue', false));
    categoryService.add(new Category('Транспорт', 'yellow', false));

    accountsService.add(new Account('Кошелек', 100));
    accountsService.add(new Account('Карта', 200));
    accountsService.add(new Account('Домашние наличные', 300));

    entryService.add(new Entry(today, categoryService.get({name:"Еда"}), accountsService.get({name:"Кошелек"}), "", "Столовая", -100));
    entryService.add(new Entry(today, categoryService.get({name:"Перевод"}), accountsService.get({name:"Домашние наличные"}), accountsService.get({name:"Кошелек"}), "", -200));
    entryService.add(new Entry(today, categoryService.get({name:"Транспорт"}), accountsService.get({name:"Кошелек"}), "", "", -20));

    // Инициализация коллекций и текущих выбранных элементов

    $scope.entries = entryService.get({date:today});
    $scope.selectedEntry = entryService.getEmptyEntry().clone();

    $scope.categories = categoryService.get();
    $scope.selectedCategory = categoryService.getEmptyCategory();

    $scope.accounts = accountsService.get();
    $scope.selectedAcc1 = accountsService.getEmptyAccount();  
    $scope.selectedAcc2 = accountsService.getEmptyAccount();  
  })();

  var transferCategory = categoryService.get({name:"Перевод"});

  $scope.categorySelected = function(category){
    $scope.selectedEntry.category = category;
    $scope.acc2Visible = transferCategory.equals(category);
    if ($scope.acc2Visible) {
      $scope.selectedEntry.acc2 = accountsService.getEmptyAccount();
    } else {
      $scope.selectedEntry.acc2 = null;
    }
    $scope.setEntryModified(true);
  }

  $scope.account1Selected = function (account) {
    $scope.selectedEntry.acc1 = account;
    if ($scope.selectedAcc1 == $scope.selectedAcc2) {
      $scope.selectedAcc2 = accountsService.getEmptyAccount();
    }
    $scope.setEntryModified(true);
  }

  $scope.account2Selected = function (account) {
    $scope.selectedEntry.acc2 = account;
    $scope.setEntryModified(true);
  }

  $scope.notEqualAcc1 = function (account) {
    return !account.equals($scope.selectedEntry.acc1);
  }

  $scope.addEntry = function () {
    if (entryService.getEmptyEntry().clone().equals($scope.selectedEntry)) return;
    $scope.selectedEntry.date = $('#datepicker').val();
    entryService.add($scope.selectedEntry);
    refreshTable();
    
    $scope.selectedEntry = entryService.getEmptyEntry().clone();
    $scope.setEntryModified(false);
    setFocusOnStartElement();
  }

  $scope.selectEntry = function (entry) {
    clearSelection();
    if (entry) {
      entry.selected = true;
      $scope.selectedEntry = entry;
      $scope.acc2Visible = transferCategory.equals(entry.category);
      $scope.isEditButtonsVisible = true;
    } else {
      $scope.selectedEntry = entryService.getEmptyEntry.clone();
    }
    $scope.setEntryModified(false);
  }

  $scope.deleteEntry = function () {
    if ($scope.selectedEntry.id != -1) {
      entryService.delete($scope.selectedEntry.id);
    }
    refreshTable();
    clearSelection();

    $scope.selectedEntry = entryService.getEmptyEntry().clone();
    $scope.setEntryModified(false);
    setFocusOnStartElement();
  }

  $scope.cancelChanges = function () {
    refreshTable();
    $scope.selectEntry(entryService.get({id:$scope.selectedEntry.id}));
  }

  function clearSelection () {
    for (var i = 0; i < $scope.entries.length; i++) {
      $scope.entries[i].selected = false;
    };
  }

  function refreshTable () {
    $scope.entries = entryService.get();
  }

  $scope.setEntryModified = function (isModified) {
    $scope.entryModified = isModified;
  };

  function setFocusOnStartElement () {
    // stub
  }
}]);