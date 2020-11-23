import BusinessDeparture from './BusinessDeparture';

export default class HR extends BusinessDeparture {
  constructor(sales, company) {
    this.income = 0;
    this.company = company;
    this.level = 0;
    this.expenses = 0;
    this.workers = 0;
    super('HR', 0, this.income, sales, (event) => {
      switch (event.name) {
      case 'UPGRADE_HR': {
        if (company.money >= Math.pow(10, (this.level + 1))) {
          this.level += 1;
          this.expenses = Math.pow(10, (this.level));
        }
      } break;
      case 'HIRE': {

      } break;
      }
    });
  }
}
