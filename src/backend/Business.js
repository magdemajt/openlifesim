import BusinessBrand from "./BusinessBrand";
import { xsmallProductMaxPrice, smallProductMaxPrice, mediumProductMaxPrice, bigProductMaxPrice } from './constants.js'; 
import { random } from 'lodash';

export default class Business {
  constructor (name, brand = new BusinessBrand(), startingMoney = 0) {
    this.name = name;
    this.brand = brand;
    this.companyMoney = parseInt(startingMoney);
    this.customerCounter = false;
    this.percentageOfMarket = 100 / (brand.competition + 1);
    this.products = [];
    this.yearlyEarnings = 0;
    this.yearlyExpenses = 0;
    this.earnedMoney = 0;
    this.marketingMoney = 0;
    this.prestigeLevel = 0;
    this.knowledgeLevel = 0; // Max 20
    this.knowledgeBias = random(1 - (0.5 - this.knowledgeLevel * 0.025), 1 + (0.5 - this.knowledgeLevel * 0.025));
  }
  addMoney = (user, moneyStr) => {
    if (isNaN(moneyStr)) {
      return false;
    }
    const money = parseInt(moneyStr);
    if (user.money >= money) {
      user.removeMoney(money);
      this.companyMoney += (money);
    }
  }
  calcCustomerCounterPrice = () => {
    return Math.round(1000 * Math.pow(10, this.brand.size) * (1 - this.percentageOfMarket/100));
  }
  buyCustomerCounter = () => {
    const price = this.calcCustomerCounterPrice();
    if (this.companyMoney >= price) {
      this.companyMoney -= price;
      this.customerCounter = true;
    }
  }
  calculateKnowledgeCost = () => {
    return Math.round(this.knowledgeLevel >= 20 ? 0 : (this.knowledgeLevel + 1) * (this.knowledgeLevel + 1) * Math.pow(10, 2 * this.brand.size) * 1000);
  }
  upgradeKnowledge = () => {
    const cost = this.calculateKnowledgeCost();
    if (this.companyMoney >= cost && this.knowledgeLevel < 20) {
      this.companyMoney -= cost;
      this.knowledgeLevel += 1;
    }
  }
  payDividend = (user, amount) => {
    if (this.companyMoney >= amount) {
      user.addMoney(amount);
      this.companyMoney -= amount;
    }
  }
  recalculateMarketShare = () => {
    const marketShareFromMarketing = Math.floor(this.brand.competition/(Math.max(this.marketingMoney + 10000, this.brand.potencialCustomers * 1000)) * (this.marketingMoney))
    return Math.max(100 / (this.brand.competition + 1 - marketShareFromMarketing) + this.prestigeLevel, 99); 
  }
  nextYear = (year, user) => {
    if (this.companyMoney > this.marketingMoney) {
      this.companyMoney -= this.marketingMoney; 
    }
    this.percentageOfMarket = this.recalculateMarketShare();
    if (this.yearlyEarnings + this.companyMoney < this.yearlyExpenses) {
      const newEarnings = (this.yearlyEarnings + this.companyMoney)/this.yearlyExpenses * this.yearlyEarnings;
      this.yearlyExpenses = this.companyMoney + this.yearlyEarnings;
      this.yearlyEarnings = Math.round(newEarnings);
    }
    this.companyMoney += this.yearlyEarnings - this.yearlyExpenses;
    this.yearlyEarnings = 0;
    this.yearlyExpenses = 0;
    this.knowledgeBias = random(1 - (0.5 - this.knowledgeLevel * 0.025), 1 + (0.5 - this.knowledgeLevel * 0.025));
  }
  developMarketing = (user, money) => {
    if (this.companyMoney >= money) {
      this.marketingMoney = money;
    }
  }
  createProduct = (name, price, amount, precision = 1) => {
    const size = this.brand.size;
    const maxPrice = size === 0 ? xsmallProductMaxPrice : size === 1 ? smallProductMaxPrice : size === 2 ? mediumProductMaxPrice : size === 3 ? bigProductMaxPrice : 0;
    const cost = Math.round((amount * precision) * price * random(0.7, 0.9));
    const earnings = Math.round(Math.min(maxPrice, price) * Math.min(amount, this.brand.potencialCustomers * this.percentageOfMarket));
    const amountReal = Math.round(earnings /  Math.min(amount, this.brand.potencialCustomers * this.percentageOfMarket)); //amount of sold items
    if (cost <= this.companyMoney) {
      this.yearlyEarnings += earnings;
      this.companyMoney -= cost;
    } else {
      this.yearlyEarnings += Math.round(random(0.7, 0.8) * this.companyMoney / cost * earnings);
      this.companyMoney = 0;
    }
    this.products.push({ name, cost, earnings, amountReal, price });

    //productMaxPricesForbranchSize
  }
  seeProductCosts = (name, price, amount, precision = 1) => {
    const size = this.brand.size;
    const maxPrice = size === 0 ? xsmallProductMaxPrice : size === 1 ? smallProductMaxPrice : size === 2 ? mediumProductMaxPrice : size === 3 ? bigProductMaxPrice : 0;
    const cost = Math.round((amount * precision) * price * random(0.7, 0.9));
    const earnings = Math.round( price * Math.min(amount, this.brand.potencialCustomers * this.percentageOfMarket));
    return { name, cost, earnings: Math.round(earnings * this.knowledgeBias), amount, price };
  }

}