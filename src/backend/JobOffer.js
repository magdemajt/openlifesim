import { random, intersectionWith, find, remove, forEach } from 'lodash';
import Chance from 'chance';
let chance = new Chance();


const intersection = (a, b) => intersectionWith(a, b, (x, y) => (x.job === y.job && x.yearsWorking >= y.yearsWorking));


export default class JobOffer {
  constructor (job, companyName = '') {
    this.job = job;
    this.jobMates = [];
    this.companyName = companyName || chance.company();
    this.currentSalary = job.salary + Math.round(job.salary * random(-0.10, 0.10, true));
  }

  generateSalary = () => {
    this.currentSalary = this.job.salary + Math.round(this.job.salary * random(-0.10, 0.10, true));
  }

  get name() {
    return this.job.name;
  }
  get yearsWorking() {
    return this.job.yearsWorking;
  }
  get requirement() {
    return this.job.requirement;
  }
  get skillGrowth() {
    return this.job.skillGrowth;
  }
  nextYear = (user) => {
    user.addMoney(this.currentSalary);
    user.addSkill(this.job.skillGrowth);
    this.job.yearsWorking += 1;
    if (random(0, 4) > 3) {
      this.currentSalary += Math.round(this.currentSalary * random(0.05, 0.01, true));
    }
  }
  applyForJob = (user) => {
    const newPastJobs = [...user.pastJobs];
    const currentJobArray = remove(newPastJobs, (j) => user.job.name === j.job);
    let currentJob = { job: user.job.name, yearsWorking: user.job.yearsWorking };
    if (currentJobArray.length > 0) {
      currentJob = currentJobArray[0];
      currentJob.yearsWorking += user.job.yearsWorking;
    }
    newPastJobs.push(currentJob);
    let meetRequirements = true;
    forEach(this.job.requirement, (req, reqName) => {
      if (user.skills[reqName] < req) {
        meetRequirements = false;
      }
    });
    if (meetRequirements && intersection(newPastJobs, this.job.requiredJobs).length === this.job.requiredJobs.length) {
      if (user.lifeStats.happiness >= 0 || this.name === 'Unemployed' || this.name === 'Student') {
        const oldJob = user.job;
        user.job = this;
        user.pastJobs = newPastJobs;
        if (user.timeLeft() < 0) {
          user.job = oldJob;
          return false;
        }
        return true;
      }
    }
    return false;
  }
}