import User from "./User";
import { random } from 'lodash';
import Person from "./Person";
import { FAMILY_RELATION, LOVE_RELATION, MATES_RELATION, FRIENDS_RELATION } from "./database";

const coeff = 0.2;

const checkRelationChange = (person) => {
  if ((person.relationType === MATES_RELATION || person.relationType === 0) && person.relation >= 60) {
    person.relationType = FRIENDS_RELATION;
  }
  if ((person.relationType === FRIENDS_RELATION || person.relationType === 0) && person.relation >= 20 && person.relation < 60) {
    person.relationType = MATES_RELATION;
  }
  if ((person.relationType === FRIENDS_RELATION || person.relationType === MATES_RELATION) && person.relation < 20 ) {
    person.relationType = 0;
  }
  if (person.relation > 100) {
    person.relation = 100;
  }
}

export const askForMoney = (user = new User(), person = new Person(), amount) => {
  if (person.money > 0) {
    const percentageOfMoney = Math.round(amount / person.money * 100);
    const chanceOfGetting = Math.max(100 - percentageOfMoney * percentageOfMoney * coeff, 5);
    if (person.relation > 50 && (person.relationType !== 0 && person.relationType !== MATES_RELATION) && random(0, 100) > 100 - chanceOfGetting && person.money >= amount) {
      user.addMoney(amount)
      person.payMoney(amount);
      person.relation -= random(1, 5);
      return true;
    }
  }
  person.relation -= random(5, 15);
  return false;
}
export const giveMoney = (user = new User(), person = new Person(), amount) => {
  const increaseInRelation = random(0, 8);
  if (amount <= user.money && amount > 0) {
    user.payMoney(amount);
    person.relation += increaseInRelation;
    checkRelationChange(person);
    return true;
  }
  return false;
}
export const doFriendlyStuff = (user = new User(), person = new Person()) => {
  const change = random(-5, 15);
  person.relation += change
  checkRelationChange(person);
  if (change > 0) {
    return true;
  }
  return false;
}

export const askToBeADate = (user = new User(), person = new Person()) => {
  if (person.relation > 80 && random(1, 2) > 1 ) {
    person.relation += 5;
    person.relationType = LOVE_RELATION;
    return true;
  } else {
    person.relation -= random(20, 40);
    checkRelationChange(person);
    return false;
  }
}

export const joke = (user = new User(), person = new Person()) => {
  if (random(1, 4) > 3) {
    person.relation -= 5;
    checkRelationChange(person);
    return false;
  }
  person.relation += 5;
  checkRelationChange(person);
  return true;
}

export const talk = (user = new User(), person = new Person()) => {
  const change = random(-1, 5);
  person.relation += change
  checkRelationChange(person);
  if (change > 0) {
    return true;
  }
  return false;
}

export const shoutAt = (user = new User(), person = new Person()) => {
  person.relation -= 20;
  checkRelationChange(person);
  user.lifeStats.happiness += 5;
}

export const assault = (user = new User(), person = new Person()) => {
  person.relation = 0;
  checkRelationChange(person);
  if (random(1, 2) > 1) {
    user.lifeStats.happiness += 2;
    return true;
  }
  user.lifeStats.health -= 5;
  return false;
}

export const doRomanticStuff = (user = new User(), person = new User()) => {
  person.relation += 10;
  user.lifeStats.happiness += 2;
  user.payMoney(random(500, 1000));
  checkRelationChange(person);
}

export const tryForABaby = (user = new User(), person = new Person()) => {
  if (random (1, 4) > 3) {
    Person.generateUserChildren(user.gender === 1 ? user : person, user.gender === 0 ? user : person);
    user.lifeStats.happiness += 10;
    return true;
  }
  return false;
}
///////////////////////////////////////////////////
export const propose = (user = new User(), person = new Person()) => {
  if (person.relation > 95 && random(1, 10) > 9) {
    user.lifeStats.happiness += 10;
    return true;
  }
  user.lifeStats.happiness -= 10;
  person.relation -= 10;
  checkRelationChange(person);
  return false;
}

export const marry = (user = new User(), person = new Person()) => {

}

