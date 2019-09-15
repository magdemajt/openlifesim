import { random, forEach } from 'lodash';
export default class Career {
  constructor(name, skillName, carrerStats = [], carrerStatsIncrementFunction = () => (stat) => { return stat.amount *= random(1, 2) }) {
    this.name = name;
    this.skillName = skillName;
    this.skills = 0;
    this.naturalSkillGain = 0;
    this.skillGain = 0;
    if (random(0, 4) > 3) {
      this.naturalSkillGain = random(1, 3); 
    }
    this.carrerStats = carrerStats;
    this.carrerStatsIncrementFunction = carrerStatsIncrementFunction;

  }
  nextYear = (user) => {
    this.skills += this.naturalSkillGain + this.skillGain;
    forEach(this.carrerStats, this.carrerStatsIncrementFunction(this.skills));
  }
}