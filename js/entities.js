function FinanceAppEntity () {
}

FinanceAppEntity.prototype.equals = function (entity) {
  var clone = {};
  for (prop in entity) {
    if (!entity.hasOwnProperty(prop)) continue;
    if (this[prop] != entity[prop]) {
      return false;
    }
  }
  return true;
}

//--------------------------------------------------------------------------------------------------------

function Entry (date, category, acc1, acc2, description, sum) {
  this.date = date;
  this.category = category;
  this.acc1 = acc1;
  this.acc2 = acc2;
  this.description = description;
  this.sum = sum;
}

Entry.prototype = new FinanceAppEntity();

Entry.prototype.clone = function () {
  return new Entry(this.date, this.category, this.acc1, this.acc2, this.description, this.sum);
};

//--------------------------------------------------------------------------------------------------------

function Category (name, color, specialType) {
  this.name = name;
  this.color = color;
  this.specialType = specialType;
}

Category.prototype = new FinanceAppEntity();

Category.prototype.clone = function () {
  return new Category(this.name, this.category, this.specialType);
}

//--------------------------------------------------------------------------------------------------------

function Account (name, state) {
  this.name = name;
  this.state = state;
}

Account.prototype = new FinanceAppEntity();

Account.prototype.clone = function () {
  return new Account(this.name, this.state);
}