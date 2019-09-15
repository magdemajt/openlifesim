import House from "./House";
import { random } from "lodash";
import User from "./User";
import Chance from 'chance';

const chance = new Chance(); 

export default class HouseOffer {
  constructor (house = new House()) {
    this.house = house;
    this.price = Math.round((40000 * random(1, 2) * random(0.9, 1.1) * this.house.rooms + random(2000, 20000)) * this.house.priceCoeff);
    this.rented = false;
    this.habitable = house.habitable;
    this.rentMoney = Math.round(this.house.rooms * random(2000, 10000) * this.house.rentCoeff);
    this.rentable = house.rentable;
    this.street = chance.address({ short_suffix: true });
  }
  maximizeRent = () => {
    this.rentMoney = Math.round(this.house.rooms * random(9900, 10000) * this.house.rentCoeff);
  }
  get livingCost () {
    return this.house.livingCost;
  }
  get name () {
    return this.house.name + ' ' + this.street;
  }
  get rent () {
    return this.rentable ? this.rentMoney : 0;
  }
  nextYear = (user = new User()) => {
    if (this.rented) {
      user.addMoney(this.rentMoney);
    }
    user.payMoney(this.livingCost);
  }
}