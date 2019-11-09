import { random } from 'lodash';

export default class BusinessBrand {
  constructor (name, boomYear, size, boomSizeChange) {
    this.potencialCustomers = 0;
    this.boomYear = boomYear;
    this.boomSizeChange = boomSizeChange;
    this.breakYear = boomYear + random(1, 10); // Year when bubble breaks
    this.name = name;
    this.size = size;
    this.potencialCustomers = 0;
    this.competition = 0;
    this.reactionTime = random(2, 8); // time of reaction after market changes
    if (this.reactionTime + boomYear === this.breakYear) {
      this.reactionTime -= 1;
    }
    this.addCompetition({});
    this.addCustomers({});
  }
  addCompetition = ({offset = 0, multiplier = 1}) => {
    switch (this.size) {
      case 0:
          this.competition += random(1, 5) * multiplier + offset ;
      break;
      case 1: 
        this.competition += random(1, 10) * multiplier + offset;
      break;
      case 2:
          this.competition += random(10, 50) * multiplier + offset;
      break;
      case 3:
          this.competition += random(50, 100) * multiplier + offset;
      break;
      default:
        this.potencialCustomers = 0;
    }
    this.competition = Math.round(this.competition);
  }
  addCustomers = ({ offset = 0, multiplier = 1 }) => {
    switch (this.size) {
      case 0: 
        this.potencialCustomers += (10000 * multiplier) + offset;
      break;
      case 1:
        this.potencialCustomers += 500000 * multiplier + offset;
      break;
      case 2:
        this.potencialCustomers += 10000000 * multiplier + offset;
      break;
      case 3:
        this.potencialCustomers += 100000000 * multiplier + offset;
      break;
      default:
        this.potencialCustomers = 0;
    }
    this.potencialCustomers = Math.round(this.potencialCustomers);
  }
  nextYear = (year) => {
    if (year === this.boomYear) {
      if (this.boomSizeChange) {
        this.size = Math.min(3, this.size + 1);
      }
      this.addCustomers({ multiplier: random(4, 7) });
    } else {
      this.addCustomers({ multiplier: random(-0.01, 0.01) });
    }
    if (year === this.boomYear + this.reactionTime) {
      this.addCompetition({offset: 2, multiplier: random(5, 10)});
    } else {
      if (random(1, 4) > 3) {
        this.addCompetition({ multiplier: random(0.01, 0.1) });
      }
    }
    if (year === this.breakYear) {
      this.potencialCustomers = Math.round(this.potencialCustomers / random(2, 3));
    }
    if (year === this.breakYear + this.reactionTime) {
      this.competition = Math.round(this.competition / random(2, 3));
    }
    if (year === this.breakYear + 2 * this.reactionTime) {
      this.addCustomers({ multiplier: random(2, 4) });
    }
  }
}