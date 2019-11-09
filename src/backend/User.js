import { reduce, filter, forEach, isEqual, random } from 'lodash';
import React from 'react';
import { richIncomeMin, richIncomeMax, veryRichIncomeMin, veryRichIncomeMax, extremeRichSeed, poorMaxIncome, availableSkills } from './constants';
import { child, student, unemployed, extraTimeLessons } from './database';
import LifeStats from './LifeStats';
import Chance from 'chance';
import Cookies from 'js-cookie';
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
  const newUser = User.update(oldUser);
  Cookies.set('save', { user: newUser, ...Cookies.getJSON('save') });
  return newUser;
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
    this.skills = {...availableSkills, charisma: random(0, 1)}; 
    this.house = null;
    this.houses = [];
    this.cars = [];
    this.businesses = [];
    this.pastJobs = [];
    this.lifeStats = new LifeStats();
    this.livingWithParents = true;
    this.endgameStats = {
      totalEarnedMoney: 0,
      totalSpentMoney: 0
    }
    this.interactionsMade = 0;
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
    this.name = chance.first({ gender: this.gender === 1 ? "male" : "female" });
    this.surename = chance.last({});
  }
  setGender = (gender) => {
    this.gender = gender;
  }
  
  addMoney = (money) => {
    this.money += money;
    this.endgameStats.totalEarnedMoney += money;
  }
  addSkill = (skills) => {
    if (typeof skills === 'number') {
      forEach(this.skills, (skill, skillName) => {
        this.skills[skillName] += skills;
      });
    }
    if (typeof skills === 'object') {
      forEach(skills, (skill, skillName) => {
        this.skills[skillName] += skill;
      });
    }
  }
  moneyAfterYear = () => {
    return this.income() + this.lifeStats.moneyAfterYear(this);
  }
  nextYear = (setInfo, setColor, year, user = true, triggerSiblingsUpdate = true, triggerChildrenUpdate = true) => {
    const extraLessonNextYearUser = () => {
      if (user) {
        forEach(this.lifeStats.extraLessons, extraTimeLesson => {
          extraTimeLesson.nextYear(this);
        })
      }
    };
    const userParentsNextYear = () => {
      if (this.parents !== null && user) {
        const diedFather = this.parents.father.nextYearPerson(setInfo, setColor, year);
        const diedMother = this.parents.mother.nextYearPerson(setInfo, setColor, year);
        if (diedFather !== undefined || diedMother !== undefined) {
          setColor("warning");
          setInfo(<NumberFormat prefix={'At least one of your parents have died, inheritance: '} displayType="text" value={diedFather !== undefined ? diedFather.money : 0 + diedMother !== undefined ? diedMother.money : 0} thousandSeparator={true} />)
        }
      }
    };
    const siblingsAndChildrenNextYear = () => {
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
    };
    const manageUserSchoolSystem = () => {
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

    const clearInteractions = () => {
      this.interactionsMade = 0;
    };


    if (this.lifeStats.geniusTrait && this.job !== null && (user || random(1, 5) > 4) ) {
      this.addSkill(this.job.skillGrowth);
    }
    this.job.nextYear(this);
    
    userParentsNextYear();
    siblingsAndChildrenNextYear();
    
    
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

    forEach(this.businesses, business => {
      business.nextYear(year, this);
    })
    
    manageUserSchoolSystem();
    extraLessonNextYearUser();
    clearInteractions();
  }
  removeMoney = (toPay) => {
    this.money -= Number(toPay);
    console.log(this.money)
    this.endgameStats.totalSpentMoney += toPay;
  }
}