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
    this.marketingLevel = 0;
    this.efficiencyLevel = 0;
    this.prestigeLevel = 0;
    this.knowledgeLevel = 0; // Max 20
    this.knowledgeBias = random(1 - (0.5 - this.knowledgeLevel * 0.025), 1 + (0.5 - this.knowledgeLevel * 0.025));
    this.costBias = random(0.9, 0.99);
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
  calculateMarketingCost = () => {
    return Math.round(this.marketingLevel >= 20 ? 0 : (this.marketingLevel + 1) * (this.marketingLevel + 1) * Math.pow(10, 2 * this.brand.size) * 1000);
  }
  calculateEfficiencyCost = () => {
    return Math.round(this.efficiencyLevel >= 20 ? 0 : (this.efficiencyLevel + 1) * (this.efficiencyLevel + 1) * Math.pow(10, 2 * this.brand.size) * 1000);
  }
  upgradeKnowledge = () => {
    const cost = this.calculateKnowledgeCost();
    if (this.companyMoney >= cost && this.knowledgeLevel < 20) {
      this.companyMoney -= cost;
      this.knowledgeLevel += 1;
    }
  }
  upgradeMarketing = () => {
    const cost = this.calculateMarketingCost();
    if (this.companyMoney >= cost && this.knowledgeLevel < 100) {
      this.companyMoney -= cost;
      this.marketingLevel += 1;
    }
  }
  upgradeEfficiency = () => {
    const cost = this.calculateProductCosts();
    if (this.companyMoney >= cost && this.knowledgeLevel < 100) {
      this.companyMoney -= cost;
      this.efficiencyLevel += 1;
    }
  }
  payDividend = (user, amount) => {
    if (this.companyMoney >= amount) {
      user.addMoney(amount);
      this.companyMoney -= amount;
    }
  }
  recalculateMarketShare = () => {
    return Math.max(100 / (this.brand.competition + 1) + this.prestigeLevel, 99); 
  }
  nextYear = (year, user) => {
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
    this.costBias = random(0.7, 0.9);
  }
  calculateProductCosts = (price, amount) => {
    const productAveragePrice = (1 - 0.05 * this.marketingLevel) * this.brand.productAveragePrice;
    const productAverageCost = (1 - 0.05 * this.efficiencyLevel) * this.brand.productAverageCost;
    let sold = 0;
    if (price < productAveragePrice) {
      sold = Math.min(amount, Math.round(this.brand.potencialCustomers * this.percentageOfMarket));
    } else {
      const amountToSell = Math.min(amount, this.percentageOfMarket / 100 * this.brand.potencialCustomers)
      sold = Math.round(amountToSell * Math.exp(-Math.pow((price /(this.brand.productAveragePrice) - 1), 2)/(2 * this.brand.priceDistribution*this.brand.priceDistribution))/(this.brand.priceDistribution * Math.sqrt(2 * Math.PI)))
    }
    const cost = Math.round(amount * productAverageCost * this.costBias);
    const earnings = price * sold;
    const amountReal = sold;
    console.log(amountReal, earnings, cost, this.brand)
    return { cost, earnings, amountReal };
  }
  createProduct = (name, price, amount, precision = 1) => {
    const { earnings, cost, amountReal } = this.calculateProductCosts(price, amount);
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
    const { earnings, cost, amountReal } = this.calculateProductCosts(price, amount);
    return { name, cost, earnings: Math.round(earnings * this.knowledgeBias), amount, price };
  }

}