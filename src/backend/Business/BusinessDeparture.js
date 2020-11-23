export default class BusinessDeparture {
  constructor(name, income, expenses, sales, modifySales) {
    this.name = name;
    this.income = income;
    this.expenses = expenses;
    this.modifySales = modifySales;
  }

    doTick = () => {
      this.modifySales();
    }

    getIncome = () => {

    }
}
