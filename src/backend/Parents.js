import { random } from 'lodash';
import { richIncomeMin, richIncomeMax, veryRichIncomeMin, veryRichIncomeMax, extremeRichSeed, poorMaxIncome } from './constants';

export default class Parents {
  constructor () {
    this.parentsIncome = 0;
    this.parentsMoney = 0;
    this.parentsDeathAge = random(18, 50);
    this.randomizeParentsIncome();
  }
  randomizeParentsIncome = () => {
    const richSeed = random(1, 25);
    this.parentsIncome = random(poorMaxIncome, richIncomeMin);
    if (richSeed > 20) {
      const richSpecificSeed = random(1, 3);
      if (richSpecificSeed === 3) {
        this.parentsIncome = random(richIncomeMin, richIncomeMax);
      } else {
        this.parentsIncome = random(richIncomeMin, (2 * richIncomeMin));
      }
    }
    if (richSeed === 25) {
      this.parentsIncome = random(veryRichIncomeMin, veryRichIncomeMax);
      if ( random(1, extremeRichSeed) === 1 ) {
        this.parentsIncome = random(veryRichIncomeMax * 2, veryRichIncomeMax * 10);
      }
    }
    if (richSeed < 4) {
      this.parentsIncome = random(100, poorMaxIncome);
    }
  }
  nextYear = (user, setInfo, setColor) => {
    if (user.age < this.parentsDeathAge) {
      this.parentsMoney += Math.round(random(0.1, 0.9) * this.parentsIncome);
      if (user.house === null) {
        const pocketMoney = Math.round(this.parentsIncome * random(0.01, 0.03)); 
        user.addMoney(pocketMoney);
        setColor("info");
        setInfo(`Your parents gave you your pocket money: ${pocketMoney}`);
      }
    } else if (user.age === this.parentsDeathAge) {
      setColor("warning");
      setInfo(`Your parents died, but they left you: ${this.parentsMoney}`);
      user.addMoney(this.parentsMoney);
    }
  }
} 