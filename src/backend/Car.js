export default class Car {
  constructor (name, yearOfProduction, productionPrice, minimalPrice, horsepower, engine) {
    this.name = name;
    this.yearOfProduction = yearOfProduction;
    this.productionPrice = productionPrice;
    this.minimalPrice = minimalPrice;
    this.horsepower = horsepower;
    this.engine = engine;
  }
  get productionYear () {
    return this.yearOfProduction;
  }
}