import Car from "./Car";
import { random } from 'lodash';

export default class CarOffer {
  constructor (car = new Car(), currentYear) {
    this.car = car;
    this.horsepower = car.horsepower;
    this.price = 0;
    this.millage = 0;
    this.cost = 0;
    // this.condition = 100;
    this.generateMillageAndPriceAndCost(currentYear)
  }
  
  get name () {
    return this.car.name + ' ' + this.car.engine;
  }

  generateMillageAndPriceAndCost = (currentYear) => {
    this.price = ((this.car.productionPrice - this.car.minimalPrice) / 256) * (currentYear - this.car.productionYear) * (currentYear - this.car.productionYear) - (((this.car.productionPrice - this.car.minimalPrice) / 8) * (currentYear - this.car.productionYear)) + this.car.productionPrice;
    this.price = Math.round(random(0.95, 1.1) * this.price);
    this.millage = Math.round(random(1000, 5000) * (currentYear - this.car.yearOfProduction));
    this.cost = Math.round(random(0.01, 0.03) * this.price);
  }

  nextYear = (user, setInfo, setColor, year) => {
    user.removeMoney(this.cost)
    // if (this.condition <= 0) {
    //   setColor("warning");
    //   setInfo(`Car ${this.name} is broken, you had to pay: ${Math.round(this.cost * 3)}`);
    //   this.condition += 20;
    //   user.removeMoney(Math.round(this.cost * 3));
    // }
    this.generateMillageAndPriceAndCost(year);
  }
}