import { availableSkills } from "./constants";
import { forEach } from 'lodash';
import User from "./User";

export default class ExtraTimeLesson {
  constructor (name = 'Do some math!', price = 0, time = 0, skillsItAdds = availableSkills, requiredSkills = availableSkills) {
    this.name = name;
    this.price = price;
    this.time = time;
    this.skillsItAdds = skillsItAdds;
    this.requiredSkills = requiredSkills
    this.active = false;
  }
  checkIfCanActivate = (user = new User()) => {
    return user.timeLeft() >= this.time && user.moneyAfterYear() >= this.price;
  }
  nextYear = (user = new User()) => {
    const addSkillsForMoneyIfActive = () => {
      if (this.active) {
        user.removeMoney(this.price);
        forEach(this.skillsItAdds, (skill, skillName) => {
          user.skills[skillName] += skill;
        });
      }
    }
    const deactivateIfNotEnoughMoney = () => {
      if (user.money < this.price) {
        this.active = false;
      }
      
    }
    const deactivateIfNotEnoughSkills = () => {
      if (this.active) {
        forEach(this.requiredSkills, (skill, skillName) => {
          if (user.skills[skillName] < skill) {
            this.active = false;
          }
        })
      }
    }

    deactivateIfNotEnoughMoney();
    deactivateIfNotEnoughSkills();
    addSkillsForMoneyIfActive();
  }
}