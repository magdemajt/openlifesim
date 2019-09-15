import { reduce, filter, forEach, isEqual } from 'lodash';
import React from 'react';
import { richIncomeMin, richIncomeMax, veryRichIncomeMin, veryRichIncomeMax, extremeRichSeed, poorMaxIncome } from './constants';
import { child, student, unemployed } from './database';
import LifeStats from './LifeStats';
import Chance from 'chance';
import uuidv1 from 'uuid/v1';
import NumberFormat from 'react-number-format';

const chance = new Chance(Math.random);

export const generateUser = () => {
  const user = new User();
  Math.round(Math.random()) === 1 ? user.setGender(1) : user.setGender(0);
  user.sexuality = Number(!Boolean(user.gender));
  user.generateNames();
  return user;
};

export const updateUser = (oldUser) => {
  return User.update(oldUser);
};

export default class User {
  constructor(uuid = uuidv1()) {
    this.uuid = uuid;
    this.name = '';
    this.surename = '';
    this.gender = 0;
    this.money = 0;
    this.parents = null;
    this.partners = [];
    this.fiancees = [];
    this.siblings = [];
    this.sexuality = 1;
    this.age = 1;
    this.job = child;
    this.children = [];
    this.skills = {
      knowledge: 0,
      logic: 0,
      languages: 0,
      driving: 0,
      sport: 0,
      programming: 0,
      management: 0,
      charisma: 0,
      biology: 0,
      teaching: 0,
      arts: 0,
      counting: 0,
      law: 0,
      science: 0,
    };
    this.house = null;
    this.houses = [];
    this.cars = [];
    this.pastJobs = [];
    this.lifeStats = new LifeStats();
    this.livingWithParents = true;
  }
  static update (oldUser) {
    const user = new User(oldUser.uuid);
    for (let x in oldUser) {
      if (typeof user[x] !== 'function') {
        user[x] = oldUser[x];
      }
    }
    forEach(user.parents, par => {
      const filtered = filter(par.children, (child) => child.uuid !== oldUser.uuid);
      filtered.push(user);
      par.children = filtered;
    });
    return user;
  }

  income = () => {
    const moneyForHouses = reduce(this.houses, (sum, house) => {return house.rented ? sum + house.rentMoney : sum}, 0)
    return this.job.currentSalary + moneyForHouses;
  }
  timeLeft = () => {
    return this.lifeStats.timeLeftStats(this);
  }
  changeSleepTime = (newSleepTime) => {
    return this.lifeStats.changeSleepTime(newSleepTime, this);
  }
  changeSelectedFood = (newFood) => {
    return this.lifeStats.changeSelectedFood(newFood, this);
  }
  changeSelectedParty = (newParty) => {
    return this.lifeStats.changeSelectedParty(newParty, this);
  }
  generateNames = () => {
    this.name = chance.first({ gender: this.gender === 1 ? "male" : "female", nactionality: 'en' });
    this.surename = chance.last({ nactionality: 'en' });
  }
  setGender = (gender) => {
    this.gender = gender;
  }
  
  addMoney = (money) => {
    this.money += money;
  }
  addSkill = (skills) => {
    forEach(skills, (skill, skillName) => {
      this.skills[skillName] += skill;
    });
  }
  nextYear = (setInfo, setColor, year, user = true, triggerSiblingsUpdate = true, triggerChildrenUpdate = true) => {
    if (this.lifeStats.geniusTrait && this.job.skillGrowth > 0) {
      this.skills += 1;
    }
    this.job.nextYear(this);
    if (this.parents !== null && user) {
      const diedFather = this.parents.father.nextYearPerson(setInfo, setColor, year);
      const diedMother = this.parents.mother.nextYearPerson(setInfo, setColor, year);
      if (diedFather !== undefined || diedMother !== undefined) {
        setColor("warning");
        setInfo(<NumberFormat prefix={'At least one of your parents have died, inheritance: '} displayType="text" value={diedFather !== undefined ? diedFather.money : 0 + diedMother !== undefined ? diedMother.money : 0} thousandSeparator={true} />)
      }
    }
    if (triggerSiblingsUpdate) {
      forEach(this.siblings, (sib) => {
        sib.nextYearPerson(setInfo, setColor, year, false);
      });
    }
    if (triggerChildrenUpdate) {
      forEach(this.children, (child) => {
        child.nextYearPerson(setInfo, setColor, year, false);
      });
    }
    if (this.age >= 16) {
      this.lifeStats.nextYear(this);
      this.houses.forEach(house => {
        house.nextYear(this);
      });
      this.cars.forEach(car => {
        car.nextYear(this, setInfo, setColor, year)
      });
    }
    this.age += 1;
    if (this.age === 6) {
      student.applyForJob(this);
      if (user) {
        setColor("info");
        setInfo('You started School.');
      }
    }
    if (this.age === 16) {
      unemployed.applyForJob(this);
      if (user) {
        setColor("info");
        setInfo('You finished School. Now you pay for your food.');
        this.changeSelectedFood(this.lifeStats.foodOptions[0]);
      }
    }
  }
  payMoney = (toPay) => {
    this.money -= toPay;
  }
}