import {forEach} from 'lodash';
export default class Company {
    constructor (departures, sales) {
        this.departures = departures;
        this.sales = sales;
        this.income = 0;
        this.expenses = 0;
        this.hasIncome = true;
        this.hasExpenses = true;
    }
    doTick = () => {
        forEach(this.departures, departure => departure.doTick());
        
        this.sales.doTick();
    }
}