import { random, sample, filter, includes, reduce } from 'lodash';
import history from '../history';
import Cookies from 'js-cookie';
import { unemployed, nonJobWork, extraTimeLessons } from './database';
import User from './User';

const obligatory = [
  {
    name: 'Eat from trash',
    price: 0,
    healthDecay: 15,
    timeDecay: 5
  }
];
const foodOptions = {
  taiFood: [
    {
      name: 'Cheap Tai Food',
      price: 5000,
      healthDecay: 5,
      timeDecay: 1
    }, 
    {
      name: 'Good Tai Food',
      price: 10000,
      healthDecay: 3,
      timeDecay: 1
    },
    {
      name: '5-star Tai Food',
      price: 25000,
      healthDecay: 1,
      timeDecay: 1
    }, 
    {
      name: 'Homemade Cheap Tai Food',
      price: 3500,
      healthDecay: 5,
      timeDecay: 3
    }, 
    {
      name: 'Homemade Tai Food',
      price: 5000,
      healthDecay: 3,
      timeDecay: 3
    }, 
    {
      name: 'Homemade Eco Tai Food',
      price: 10000,
      healthDecay: 0,
      timeDecay: 3
    }
  ],
  italianFood: [
    {
      name: 'Cheap Italian Food',
      price: 5000,
      healthDecay: 5,
      timeDecay: 1
    }, 
    {
      name: 'Good Italian Food',
      price: 10000,
      healthDecay: 3,
      timeDecay: 1
    },
    {
      name: '5-star Italian Food',
      price: 25000,
      healthDecay: 1,
      timeDecay: 1
    }, 
    {
      name: 'Homemade Cheap Italian Food',
      price: 3500,
      healthDecay: 5,
      timeDecay: 3
    }, 
    {
      name: 'Homemade Italian Food',
      price: 5000,
      healthDecay: 3,
      timeDecay: 3
    }, 
    {
      name: 'Homemade Eco Italian Food',
      price: 10000,
      healthDecay: 0,
      timeDecay: 3
    },
    {
      name: 'Pizza',
      price: 2500, 
      healthDecay: 7,
      timeDecay: 1
    }
  ],
  frenchFood: [
    {
      name: 'Cheap French Food',
      price: 5000,
      healthDecay: 5,
      timeDecay: 1
    }, 
    {
      name: 'Good French Food',
      price: 10000,
      healthDecay: 3,
      timeDecay: 1
    },
    {
      name: '5-star French Food',
      price: 25000,
      healthDecay: 1,
      timeDecay: 1
    }, 
    {
      name: 'Homemade Cheap French Food',
      price: 3500,
      healthDecay: 5,
      timeDecay: 3
    }, 
    {
      name: 'Homemade French Food',
      price: 5000,
      healthDecay: 3,
      timeDecay: 3
    }, 
    {
      name: 'Homemade Eco French Food',
      price: 10000,
      healthDecay: 0,
      timeDecay: 3
    }
  ],
  americanFood: [
    {
      name: 'Cheap American Food',
      price: 5000,
      healthDecay: 5,
      timeDecay: 1
    }, 
    {
      name: 'Good American Food',
      price: 10000,
      healthDecay: 3,
      timeDecay: 1
    },
    {
      name: '5-star American Food',
      price: 25000,
      healthDecay: 1,
      timeDecay: 1
    }, 
    {
      name: 'Homemade Cheap American Food',
      price: 3500,
      healthDecay: 5,
      timeDecay: 3
    }, 
    {
      name: 'Homemade American Food',
      price: 5000,
      healthDecay: 3,
      timeDecay: 3
    }, 
    {
      name: 'Homemade Eco American Food',
      price: 10000,
      healthDecay: 0,
      timeDecay: 3
    }
  ],
  polishFood: [
    {
      name: 'Cheap Polish Food',
      price: 5000,
      healthDecay: 5,
      timeDecay: 1
    }, 
    {
      name: 'Good Polish Food',
      price: 10000,
      healthDecay: 3,
      timeDecay: 1
    },
    {
      name: '5-star Polish Food',
      price: 25000,
      healthDecay: 1,
      timeDecay: 1
    }, 
    {
      name: 'Homemade Cheap Polish Food',
      price: 3500,
      healthDecay: 5,
      timeDecay: 3
    }, 
    {
      name: 'Homemade Polish Food',
      price: 5000,
      healthDecay: 3,
      timeDecay: 3
    }, 
    {
      name: 'Homemade Eco Polish Food',
      price: 10000,
      healthDecay: 0,
      timeDecay: 3
    }
  ]
}

const partyOptions = {
  cinema: [
    {
      name: 'Watch latest hits',
      price: 3000,
      hDecayReduction: 2,
      timeDecay: 1
    },
    {
      name: 'Movie day every week',
      price: 5000,
      hDecayReduction: 4,
      timeDecay: 2
    },
    {
      name: 'Movie day every day',
      price: 10000,
      hDecayReduction: 15,
      timeDecay: 4
    },
    {
      name: 'Go to the cinema sometimes',
      price: 1000,
      hDecayReduction: 1,
      timeDecay: 1
    },
    {
      name: 'Go to the cinema with movie stars',
      price: 20000,
      hDecayReduction: 10,
      timeDecay: 1
    },
  ],
  cars: [
    {
      name: 'Watch car events',
      price: 3000,
      hDecayReduction: 2,
      timeDecay: 1
    },
    {
      name: 'Build a car project',
      price: 30000,
      hDecayReduction: 10,
      timeDecay: 3
    },
    {
      name: 'Watch the F1 Cup',
      price: 10000,
      hDecayReduction: 5,
      timeDecay: 1
    },
    {
      name: 'Watch car racing in TV',
      price: 1000,
      hDecayReduction: 1,
      timeDecay: 1
    },
    {
      name: 'Go to a car dealer',
      price: 1000,
      hDecayReduction: 3,
      timeDecay: 3
    }
  ],
  sports: [
    {
      name: 'Watch sports in TV',
      price: 1000,
      hDecayReduction: 1,
      timeDecay: 1
    },
    {
      name: 'Support your local team',
      price: 5000,
      hDecayReduction: 5,
      timeDecay: 2
    },
    {
      name: 'Buy tickets for First League',
      price: 10000,
      hDecayReduction: 5,
      timeDecay: 1
    },
    {
      name: 'Do sports as hobby',
      price: 1000,
      hDecayReduction: 5,
      timeDecay: 3
    },
    {
      name: 'Play with stars',
      price: 30000,
      hDecayReduction: 15,
      timeDecay: 2
    },
  ],
  games: [
    {
      name: 'Play classic games',
      price: 1000,
      hDecayReduction: 4,
      timeDecay: 3
    },
    {
      name: 'Play games on the best equipment',
      price: 10000,
      hDecayReduction: 6,
      timeDecay: 2
    },
    {
      name: 'Watch Game League - professional games',
      price: 1000,
      hDecayReduction: 1,
      timeDecay: 1
    },
    {
      name: 'Create your own game',
      price: 30000,
      hDecayReduction: 15,
      timeDecay: 3
    },
    {
      name: 'Play with friends',
      price: 3000,
      hDecayReduction: 5,
      timeDecay: 3
    },
  ],
  party: [
    {
      name: 'Go to party with friends',
      price: 1000,
      hDecayReduction: 1,
      timeDecay: 1
    },
    {
      name: 'Go to the party organized by celebrities',
      price: 5000,
      hDecayReduction: 5,
      timeDecay: 2
    },
    {
      name: 'Organize small party every week',
      price: 10000,
      hDecayReduction: 5,
      timeDecay: 1
    },
    {
      name: 'Organize big party every week',
      price: 30000,
      hDecayReduction: 7,
      timeDecay: 3
    },
    {
      name: 'Organize party and invite the president himself!',
      price: 300000,
      hDecayReduction: 30,
      timeDecay: 1
    },
  ]
}

export default class LifeStats {
  constructor() {
    this.health = random(400, 600);
    this.healthDecay = random(1, 5);
    this.sleepTime = 8;
    this.sleepy = Boolean(random(0, 1));
    this.sleepOptions = [6, 8, 10];
    this.workaholism = random(0, 4);
    this.happiness = 100;
    this.happinessDecay = random(0, 2);
    this.foodOptions = [];
    this.selectedFood = { timeDecay: 0, price: 0 };
    this.partyOptions = [];
    this.selectedParty = { timeDecay: 0, price: 0, hDecayReduction: 0 };
    this.investorTrait = random(0, 10) > 9;
    this.fussyEaterTrait = random(0, 10) > 9;
    this.geniusTrait = random(0, 10) > 9;
    this.cheapFood = 0;
    this.partyGoerTrait = random(0, 10) > 9;
    this.generateFoodOptions();
    this.generatePartyOptions();
    this.extraLessons = [...extraTimeLessons]
  }

  timeLeftStats = (user) => {
    const jobTime = (includes(nonJobWork, user.job.name) ? 0 : 8);
    const houseTime = this.investorTrait ? 0 : Math.floor(user.houses.length / 3);
    const extraTimeLessonsTime = reduce(this.extraLessons, ((sum, lesson) => lesson.active ? sum + lesson.time : sum), 0)
    return 24 - this.selectedFood.timeDecay - this.selectedParty.timeDecay - this.sleepTime - (jobTime) - houseTime - extraTimeLessonsTime;
  }

  changeSleepTime = (newTime, user) => {
    if (this.sleepTime - newTime + this.timeLeftStats(user) >= 0) {
      this.timeLeft += this.sleepTime - newTime;
      this.sleepTime = newTime;
      return true;
    }
    return false;
  }
  generateFoodOptions = () => {
    const optionsList = [...obligatory];
    optionsList.push(...sample(foodOptions));
    this.foodOptions = optionsList;
  }
  changeSelectedFood = (newFood, user) => {
    if (this.fussyEaterTrait && this.cheapFood >= 5 && newFood.price < 10000) {
      return false;
    }
    if (this.selectedFood.timeDecay - newFood.timeDecay + this.timeLeftStats(user) >= 0) {
      this.timeLeft += this.selectedFood.timeDecay - newFood.timeDecay;
      this.selectedFood = newFood;
      return true;
    }
    return false;
  }
  changeSelectedParty = (newParty, user) => {
    if (this.selectedParty.timeDecay - newParty.timeDecay + this.timeLeftStats(user) >= 0) {
      this.timeLeft += this.selectedParty.timeDecay - newParty.timeDecay;
      this.selectedParty = newParty;
      return true;
    }
    return false;
  }
  generatePartyOptions = () => {
    this.partyOptions = [...sample(partyOptions)];
  }
  moneyAfterYear = (user) => {
    let currentMoney = user.money;
    const removeMoneyForFood = () => {
      if (user.money >= this.selectedFood.price) {
        currentMoney -= (this.selectedFood.price);
      }
    };

    const removeMoneyForParties = () => {
      if (this.fussyEaterTrait && this.cheapFood >= 5) {
        currentMoney -= 10000;
      } else if (user.money >= this.selectedParty.price) {
        currentMoney -= (this.selectedParty.price);
      } else {
        return 0;
      }
    };
    const removeMoneyForExtraTimeLessons = () => {
      currentMoney -= reduce(extraTimeLessons, ((sum, lesson) => lesson.active ? sum + lesson.price : sum), 0);
    };

    removeMoneyForFood();
    removeMoneyForParties();
    removeMoneyForExtraTimeLessons();
    return currentMoney;
  }
  nextYear = (user) => {
    if (this.fussyEaterTrait && this.cheapFood >= 5) {
      this.selectedFood = sample(filter(this.foodOptions, (f) => f.price === 10000));
    }
    if (this.selectedFood.price < 10000) {
      this.cheapFood += 1;
    }
    if (user.money >= this.selectedFood.price) {
      this.health -= (this.healthDecay + this.selectedFood.healthDecay);
      user.removeMoney(this.selectedFood.price);
    } else {
      this.health -= (this.healthDecay + 30);
    }
    if (user.money >= this.selectedParty.price) {
      this.happiness -= (this.happinessDecay - this.selectedParty.hDecayReduction);
      user.removeMoney(this.selectedParty.price);
    } else {
      this.happiness -= (this.happinessDecay);
      user.money = 0;
    }
    if (this.health <= 0) {
      Cookies.remove('save');
      history.go(0);
    }
    if (this.happiness <= 0) {
      this.happiness = 0;
      if (user.job.name !== 'Unemployed') {
        unemployed.applyForJob(user);
      }
    }
  }
}