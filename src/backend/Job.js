import { random } from 'lodash';

export default class Job {
  constructor (name, salary, requirement = { knowledge: 0,
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
    science: 0
  }, skillGrowth = { 
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
    science: 0
   }, requiredJobs = []) {
    this.name = name;
    this.salary = salary;
    this.requirement = requirement;
    this.yearsWorking = 0;
    this.skillGrowth = skillGrowth;
    this.requiredJobs = requiredJobs;
  }
  
}