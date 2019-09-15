export default class House {
  constructor(name, rooms, maintanceWeight = 1, rentCoeff = 1, priceCoeff = 1, habitable = true, rentable = true) {
    this.name = name;
    this.rooms = rooms;
    this.maintanceWeight = maintanceWeight;
    this.livingCost = 0;
    this.habitable = habitable;
    this.rentable = rentable;
    this.rentCoeff = rentCoeff;
    this.priceCoeff = priceCoeff;
    this.calculateLivingCost();
  }
  calculateLivingCost = () => {
    const roomCost = 6000;
    this.livingCost = Math.round((this.rooms * roomCost) * this.maintanceWeight);
  }
}