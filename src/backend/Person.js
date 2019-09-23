import { random, sample, filter, reduce, sortBy, forEach, chunk, shuffle } from 'lodash';
import { birthMateOffset, skillMateOffset, jobs, houses, cars, student, unemployed, child, generateJobs, getEducation, MATES_RELATION, FAMILY_RELATION, retired } from './database';
import User from './User';
import HouseOffer from './HouseOffer';
import JobOffer from './JobOffer';
import CarOffer from './CarOffer';
import { availableSkills } from './constants';

function map_range(value, low1, high1, low2, high2) {
  const realValue = value > high1 ? high2 : value;
  return low2 + (high2 - low2) * (realValue - low1) / (high1 - low1);
}

export default class Person extends User {
  constructor (gender = random(0, 1)) {
    super();
    this.deathAge = 0;
    this.gender = gender;
    this.randomizeDeathAge();
    this.deceased = false;
    this.relation = 0;
    this.relationType = 0;
    this.generateNames();
    
  }

  randomizeSkills = () => {
    let randomSkillPoints = Math.ceil((this.age - 6) * 1.5);
    const randomizedSkills = shuffle(Object.keys(availableSkills));
    forEach(randomizedSkills, (skillName) => {
      let toAdd = random(0, 15);
      if (randomSkillPoints < 15) {
        toAdd = random(0, randomSkillPoints)
      }
      this.skills[skillName] += toAdd;
      randomSkillPoints -= toAdd;
    });
  };

  nextYearPerson = (setInfo, setColor, year, triggerSiblingsUpdate = true, triggerChildrenUpdate = false) => {
    if (!this.deceased) {
      this.nextYear(setInfo, setColor, year, false, triggerSiblingsUpdate, triggerChildrenUpdate);
      this.removeMoney(Math.round(map_range(this.income() - reduce(this.houses, (sum, h) => sum + h.livingCost, 0), 0, 120000, 0, 45000)));
      if (this.age === this.deathAge) {
        this.deceased = true;
        if (this.children.length > 0) {
          const inheritedMoney = Math.round(this.money / this.children.length);
          const houses = chunk(this.houses, Math.ceil(this.houses.length / this.children.length));
          let i = 0;
          forEach(this.children, child => {
            child.addMoney(inheritedMoney > 0 ? inheritedMoney : 0);
            if (houses[i] !== undefined)
              child.houses.push(...houses[i]);
            i+=1;
          });
          return {money: inheritedMoney, housesLength: Math.ceil(this.houses.length / this.children.length), died: true};
        }
      }
      if (this.age === 16 && this.job === null) {
        if (random(1, 2) > 1) {
          const genJobs = generateJobs(this, 0);
          this.job = sample(genJobs);
        } else {
          this.job = sample(filter(getEducation(), ed => ed.currentSalary >= 0));
        }
      }
      if (this.age >= 25 && this.job !== retired) {
        this.checkBetterJobs();
      }
      if (this.age > 60) {
        if (this.job !== unemployed && this.job !== retired && random(0, 10) > 9) {
          this.job = retired;
        }
      }
    }
  }
  randomizeDeathAge = () => {
    if (random(0, 50) > 49) {
      this.deathAge = random(17, 50);
    } else {
      this.deathAge = random(50, 100);
    }
  }

  checkBetterJobs = () => {
    const genJobs = filter(generateJobs(this, 0), job => job.currentSalary > this.job.currentSalary);
    if (genJobs.length > 0) {
      this.job = sample(genJobs);
    }

  }

  randomizeHouses = () => {
    if (random(0, 100) > 80) {
      let housesAmount = random(1, 6);
      if(this.lifeStats.investorTrait && random(1, 5) > 4) {
        housesAmount += random(10, 20);    
      }
      for (let i = 0; i < housesAmount; i+=1) {
        const personHouse = new HouseOffer(sample(filter(houses, house => ((house.rooms * 40000 * house.priceCoeff) <= this.job.currentSalary * 20 && house.rentable))));
        personHouse.maximizeRent();
        personHouse.rented = true;
        this.houses.push(personHouse);
      }
    }
    const personHouse = new HouseOffer(sample(filter(houses, house => ((house.rooms * 40000 * house.priceCoeff) <= this.job.currentSalary * 6) && house.habitable)));
    this.houses.push(personHouse);
    this.house = personHouse;
  }

  // randomizeCars = () => {
  //   if (random(0, 100) > 20) {
  //     let carsAmount = random(1, 2);
  //     if (random(0, 20) > 19) {
  //       carsAmount += random(3, 7);    
  //     }
  //     for (let i = 0; i < carsAmount; i+=1) {
  //       const personHouse = new CarOffer(sample(filter(cars, car => (car.price) <= this.job.currentSalary * 20)));
  //       personHouse.maximizeRent();
  //       this.houses.push(personHouse);
  //     }
  //   }
  //   const personHouse = new Car(sample(filter(houses, house => ((house.rooms * 40000) <= this.job.currentSalary * 6) && this.house.habitable)));
  //   this.houses.push(personHouse);
  //   this.house = personHouse;
  // }

  static generateWorkMate (user) {
    const generated = new Person();
    generated.age = random(user.age - birthMateOffset, user.age + birthMateOffset);
    generated.randomizeSkills();
    generated.job = new JobOffer(sample(filter(jobs, job => job.requirement <= user.skills)), user.job.companyName);
    generated.addMoney(generated.job.currentSalary * random(3, 7));
    generated.randomizeHouses();
    generated.relation = random(30, 45);
    generated.relationType = MATES_RELATION;
    return generated;
  }
  static generateJobMate (user) {
    const generated = new Person();
    generated.age = random(user.age, user.age + birthMateOffset);
    generated.randomizeSkills();
    generated.job = new JobOffer(user.job.job, user.job.companyName);
    generated.addMoney(generated.job.currentSalary * random(3, 7));
    generated.randomizeHouses();
    generated.relation = random(40, 55);
    generated.relationType = MATES_RELATION;
    return generated;
  }
  static generateRandomPerson (user) {
    const generated = new Person();
    generated.age = random(16, 70);
    generated.job = new JobOffer(sample(filter(jobs, job => job.requirement <= user.skills)));
    generated.randomizeHouses();
    generated.relation = random(0, 10);
  }
  static generateUnemployed (user) {
    const generated = new Person();
    generated.age = random(16, 70);
    generated.job = unemployed;
    generated.randomizeHouses();
    generated.relation = random(0, 10);
  }
  static generateUserChildren (father, mother) {
    const generated = new Person();
    generated.age = 1;
    generated.job = child;
    if (random(1, 10) > 9) {
      generated.surename = mother.surename;
    } else {
      generated.surename = father.surename;
    }
    generated.relation = random(50, 100);
    generated.relationType = FAMILY_RELATION;
    generated.parents = { father, mother };
    father.children.push(generated);
    mother.children.push(generated);
  }
  static generateChild (user) {
    const generated = new Person();
    generated.age = random(1, 16);
    generated.job = generated.age >= 6 ? student : child;
    generated.relation = random(20, 45);
    generated.relationType = MATES_RELATION;
  }
  static generateSibling (user) {
    const generated = new Person();
    generated.age = random(user.age, user.age + 10);
    generated.surename = user.surename;
    generated.relation = random(60, 95);
    generated.relationType = FAMILY_RELATION;
    generated.parents = user.parents;
    forEach(generated.parents, par => par.children.push(generated));
    generated.siblings.push(user);
    user.siblings.push(generated);
  }
  static generateParents (user) {
    const generatedFather = new Person(1);
    const generatedMother = new Person(0);

    generatedFather.age = random(16, 55);
    generatedMother.age = random(16, 50);
    
    generatedFather.randomizeSkills();
    generatedMother.randomizeSkills();
    if (generatedFather.lifeStats.geniusTrait) {
      generatedFather.addSkill(5);
    }
    if (generatedMother.lifeStats.geniusTrait) {
      generatedMother.addSkill(5);
    }
    
    const motherJobs = sortBy(generateJobs(generatedMother, 0), 'currentSalary');
    const fatherJobs = sortBy(generateJobs(generatedFather, 0), 'currentSalary');
    generatedFather.job = fatherJobs[fatherJobs.length - 1];
    generatedMother.job = motherJobs[motherJobs.length - 1];

    if (random(0, 5) > 4) {
      if (random(0, 20) > 19) {
        generatedFather.addMoney(Math.round(random(1, 50) * 10000000));
      } else {
        generatedFather.addMoney(Math.round(random(1, 50) * 200000));
      }
    } else {
      generatedFather.addMoney(Math.round(random(25000, 200000)));
    }
    if (random(0, 5) > 4) {
      if (random(0, 20) > 19) {
        generatedMother.addMoney(Math.round(random(1, 50) * 10000000));
      } else {
        generatedMother.addMoney(Math.round(random(1, 50) * 200000));
      }
    } else {
      generatedMother.addMoney(Math.round(random(25000, 200000)));
    }

    generatedFather.randomizeHouses();
    generatedMother.randomizeHouses();

    if (random(1, 10) > 8) {
      generatedMother.surename = user.surename;
    } else if (random(1, 5) > 4) {
      generatedFather.surename = user.surename;
    } else {
      generatedFather.surename = user.surename;
      generatedMother.surename = user.surename;
    }
    generatedFather.relation = random(70, 100);
    generatedFather.relationType = FAMILY_RELATION;
    generatedMother.relation = random(70, 100);
    generatedMother.relationType = FAMILY_RELATION;
    generatedFather.children.push(user);
    generatedMother.children.push(user);
    return { father: generatedFather, mother: generatedMother };
  }
}