import { random } from 'lodash';
import { availableSkills } from './database';

export default class Job {
  constructor (name, salary, requirement = availableSkills, skillGrowth = availableSkills, requiredJobs = []) {
    this.name = name;
    this.salary = salary;
    this.requirement = requirement;
    this.yearsWorking = 0;
    this.skillGrowth = skillGrowth;
    this.requiredJobs = requiredJobs;
  }
}