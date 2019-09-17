import House from "./House";
import Car from "./Car";
import Job from "./Job";
import JobOffer from "./JobOffer";
import { random, filter, sample } from 'lodash';
import HouseOffer from "./HouseOffer";
import CarOffer from "./CarOffer";

export const houses = [
  new House('Studio Apartment', 1, 1, 1.3),
  new House('Small Apartment', 2, 0.95, 1.2),
  new House('Medium Apartment', 3, 1, 1.1),
  new House('Large Apartment', 5, 1.02, 1, 1.2),
  new House('Semi-detached House', 3, 0.9, 0.7, 0.7),
  new House('Small House', 4, 1, 0.95, 1.2),
  new House('Medium House', 6, 0.95, 0.9, 1.2),
  new House('Large House', 8, 0.9, 0.8, 1.25),
  new House('Mansion', 12, 1.4, 0.5, 4),
  new House('Big Mansion', 18, 1.45, 0.5, 4),
  new House(`Star's Mansion`, 25,1.5, 0.5, 5),
  new House(`Billionaire's Mansion`, 100, 2, 0.01, 5),
  new House('Small Penthouse', 4, 1, 1.1, 1.5),
  new House('Large Penthouse', 8, 1, 1.05, 1.5),
  new House('Palace', 50, 2, 0.05, 5),
  new House('Space Station', 1, 12000, 1, 10000, false, false),
  new House('Small Motel', 3, 0.5, 1.25, 1.5, false, true),
  new House(`McDonalds' near Autobahn`, 1, 100, 81.5, 23, false, true),
  new House(`McDonalds' near Small Town`, 1, 10, 8.15, 2.1, false, true),
  new House(`Restaurant near Autobahn`, 1, 50, 40, 11, false, true),
  new House(`Restaurant near City Center`, 1, 150, 122, 35, false, true),
  new House(`Restaurant near Small Town`, 1, 5, 4, 1.05, false, true),
  new House(`Motel`, 8, 3, 5, 3, false, true),
  new House(`Small Hotel`, 10, 4, 3.7, 4, false, true),
  new House(`4-star Hotel`, 20, 10, 9.2, 10, false, true),
  new House(`5-star Hotel`, 50, 20, 17, 5, false, true),
  new House(`Hotel in Exotic Country`, 100, 30, 27, 10, false, true),
  new House(`Garage`, 1, 0.01, 0.1, 0.3, false, true),
  new House(`Gold Mine`, 1, 10000, 8000, 5500, false, true),
];

// new Job(name, salary, requirements, skillsGrowth)

export const university = [
  new Job('PE Student', -2500, { knowledge: 10 }, { sport: 1, charisma: 1 }),
  new Job('Physics Student', -5000, { knowledge: 16 }, { knowledge: 1, science: 1, logic: 1 }),
  new Job('Medicine Student', -5000, { knowledge: 16 }, { knowledge: 1, biology: 1, science: 1 }),
  new Job('Chemistry Student', -5000, { knowledge: 16 }, { knowledge: 1, logic: 1, science: 2 }),
  new Job('Law Student', -5000, { knowledge: 16 }, { knowledge: 1, charisma: 1, law: 1 }),
  new Job('Psychology Student', -5000, { knowledge: 16 }, { biology: 1, charisma: 1, knowledge: 1 }),
  new Job('Management Student', -10000, { knowledge: 16 }, { management: 1, knowledge: 1, charisma: 1, logic: 1 }),
  new Job('Accounting Student', -5000, { knowledge: 14 }, { knowledge: 1, logic: 1, counting: 1 }),
  new Job('Art Student', -5000, { knowledge: 10 }, { arts: 1 }),
  new Job('Maths Student', -5000, { knowledge: 16, logic: 6 }, { knowledge: 1, logic: 2 }),
  new Job('Computer Science Student', -5000, { knowledge: 14, logic: 2 }, { knowledge: 1, logic: 1, programming: 1 }),
  new Job('Part-time Working Student', 10000, { knowledge: 10 }, {
    knowledge: 1,
    logic: 1,
    languages: 1,
    teaching: 1,
    arts: 1
  }),
  new Job('Learning Student', 0, { knowledge: 10 }, {
    knowledge: 2,
    logic: 2,
    languages: 2,
    teaching: 2,
    arts: 1
  }),
  new Job('Student with Paid Classes', -10000, { knowledge: 10 }, {
    knowledge: 3,
    logic: 3,
    languages: 3,
    charisma: 1,
    teaching: 3,
    arts: 1
  }),
  new Job('Driving School', -2000, { knowledge: 10 }, { driving: 1, coordination: 1 }),
  new Job('Software Intern', 10000 , { knowledge: 12 }, { programming: 1, knowledge: 1 }),
]

export const education = [
  new Job('Intern Data Scientist', 10000, { knowledge: 12, logic: 2 }, { logic: 1, counting: 1, knowledge: 1 }),
  new Job('Sportsman', 0, { knowledge: 10 }, { charisma: 1, sport: 2 }),
  new Job('Painter', 5500, { knowledge: 10, arts: 2 }, { arts: 2, charisma: 1 }),
]

export const jobs = [
  new Job('Genius', 100000000, { knowledge: 100, logic: 90 }, {}),
  new Job('Junior Software Developer', 20000, { programming: 3 }, { knowledge: 1, programming: 1, logic: 1 }),
  new Job('Software Developer', 45000, 41, 1, [{ job: 'Junior Software Developer', yearsWorking: 1 }]),
  new Job('Senior Software Developer', 58000, 46, 0, [{ job: 'Software Developer', yearsWorking: 1 }]),
  new Job('Corpo Software Developer', 53000, 46, 1, [{ job: 'Software Developer', yearsWorking: 1 }]),
  new Job('Corpo Senior Software Developer', 66000, 51, 0, [{ job: 'Corpo Software Developer', yearsWorking: 1 }]),
  //Physics
  new Job('Experimental Physicist', 36000, 38, 1, [{ job: 'Physics Student', yearsWorking: 1 }]),
  new Job('Theoretical Physicist', 45000, 44, 1, [{ job: 'Physics Student', yearsWorking: 1 }]),
  new Job('Prize-winning Physicist', 60000, 50, 1, [{ job: 'Physics Student', yearsWorking: 1 }]),
  //Maths and Data Science
  new Job('Junior Data Scientist', 18500, 32, 3),
  new Job('Data Scientist', 30000, 41, 1, [{ job: 'Junior Data Scientist', yearsWorking: 1 }]),
  new Job('Senior Data Scientist', 60000, 46, 0, [{ job: 'Data Scientist', yearsWorking: 1 }]),
  new Job('Mathematician', 28000, 38, 2, [{ job: 'Maths Student', yearsWorking: 1 }]),
  new Job('Millenial Problem Solving Mathematician', 100000, 80, 0, [{ job: 'Mathematician', yearsWorking: 1 }]),
  //Psychology
  new Job('Sales Manager', 27000, 32, 2, [{ job: 'Psychology Student', yearsWorking: 1 }]),
  new Job('Sales Director', 54000, 42, 2, [{ job: 'Sales Manager', yearsWorking: 1 }]),
  new Job('Sales VP', 78000, 62, 0, [{ job: 'Sales Director', yearsWorking: 1 }]),
  new Job('Psychiatrist Intern', 20000, 32, 4, [{ job: 'Psychology Student', yearsWorking: 1 }]),
  new Job('Psychologist Intern', 15000, 32, 4, [{ job: 'Psychology Student', yearsWorking: 1 }]),
  new Job('Psychiatrist', 60000, 44, 1, [{ job: 'Psychiatrist Intern', yearsWorking: 1 }]),
  new Job('Psychologist', 50000, 40, 1, [{ job: 'Psychologist Intern', yearsWorking: 1 }]),
  // Accounting
  new Job('Intern Accountant', 23000, 37, 2, [{ job: 'Accounting Student', yearsWorking: 1 }]),
  new Job('Accountant', 23000, 41, 1, [{ job: 'Intern Accountant', yearsWorking: 1 }]),
  new Job('Main Accountant', 48000, 46, 0, [{ job: 'Accountant', yearsWorking: 1 }]),
  // Law
  new Job('Lawyer', 30000, 41, 1, [{ job: 'Law Student', yearsWorking: 1 }]),
  new Job('Judge', 46000, 51, 1, [{ job: 'Law Student', yearsWorking: 1 }]),
  new Job('Good Lawyer', 90000, 66, 0, [{ job: 'Law Student', yearsWorking: 1 }]),
  new Job('Legal Counsel', 37000, 46, 0, [{ job: 'Law Student', yearsWorking: 1 }]),
  // Chemistry
  new Job('Chemist', 43000, 38, 1, [{ job: 'Chemistry Student', yearsWorking: 1 }]),
  new Job('Prize-winning Chemist', 60000, 50, 0, [{ job: 'Chemist', yearsWorking: 1 }]),
  new Job('Pharmacologist', 85000, 68, 0, [{ job: 'Chemistry Student', yearsWorking: 1 }]),
  // Medicine
  new Job('Intern Doctor', 25000, 56, 4, [{ job: 'Medicine Student', yearsWorking: 1 }]),
  new Job('Nurse', 33000, 38, 0, [{ job: 'Medicine Student', yearsWorking: 1 }]),
  new Job('Doctor', 70000, 64, 0, [{ job: 'Intern Doctor', yearsWorking: 1 }]),
  // Art
  new Job('Actor', 35000, 37, 2, [{ job: 'Art Student', yearsWorking: 1 }]),
  new Job('Great Actor', 68000, 57, 0, [{ job: 'Actor', yearsWorking: 1 }]),
  new Job('Artist', 28000, 27, 1, [{ job: 'Art Student', yearsWorking: 1 }]),
  // Management
  new Job('Director', 63000, 65, 1, [{ job: 'Management Student', yearsWorking: 1 }]),
  new Job('VP', 72000, 70, 1, [{ job: 'Management Student', yearsWorking: 1 }]),
  new Job('SVP', 80000, 75, 1, [{ job: 'VP', yearsWorking: 1 }]),
  new Job('EVP', 85000, 77, 1, [{ job: 'SVP', yearsWorking: 1 }]),
  new Job('CFO', 88000, 78, 1, [{ job: 'Management Student', yearsWorking: 1 }]),
  new Job('CEO', 120000, 85, 0, [{ job: 'SVP', yearsWorking: 1 }]),
  // No Degree
  new Job('Bricklayer', 20000, { knowledge: 10 }, {}),
  new Job('Carpenter', 25000, { knowledge: 12, coordination: 1 }, {}),
  new Job('Driver', 27000, { knowledge: 12, coordination: 2, driving: 2 }, { driving: 1 }),
  new Job('Teacher', 29000, { knowledge: 14, teaching: 4 }, { teaching: 1 }),
  new Job('Gardener', 20000, { knowledge: 10, coordination: 1}, { arts: 1 }),
  new Job('Shop Assistant', 20000, { knowledge: 10 }, {}),
  new Job('Waiter', 20000, { knowledge: 10, coordination: 1, charisma: 1 }, { charisma: 1 }),
];

export const getEducation = () => {
  const educationArray = [];
  university.forEach(job => educationArray.push(new JobOffer(job, "University")));
  education.forEach(job => educationArray.push(new JobOffer(job)));
  return educationArray;
};

export const nonJobWork = [
  'Unemployed', 'Retired', 'Child'
];

export const generateJobs = (user, reqOffset = 10) => {
  const filteredJ = filter(jobs, job => (job.requirement <= user.skills + reqOffset));
  const jobList = [];
  for(let i = 0; i < filteredJ.length * 2; i += 1){
    jobList.push(new JobOffer(sample(filteredJ)));
  }
  return jobList;
}

export const generateHouses = (user) => {

  const houseSuggestions = filter(houses, house => (house.rooms * 40000 * house.priceCoeff <= (user.money + 10000) && house.habitable));
  const businessSuggestions = filter(houses, house => (house.rooms * 40000 * house.priceCoeff <= (user.money + 10000) && !house.habitable));
  const housesToBuy = [];
  for (let i = 0; i < houseSuggestions.length * 3; i+=1) {
    const sampleHouse = sample(houseSuggestions);
    housesToBuy.push(new HouseOffer(sampleHouse));
  }
  for (let i = 0; i < businessSuggestions.length * 3; i+=1) {
    const sampleBusiness = sample(businessSuggestions);
    housesToBuy.push(new HouseOffer(sampleBusiness));
  }
  return housesToBuy;
}

export const student = new JobOffer(new Job('Student', 0, {}, { 
  knowledge: 1
}), "School");
export const child = new JobOffer(new Job('Child', 0, {}, {}), "Home");
export const unemployed = new JobOffer(new Job('Unemployed', 0, {}, {}), "Home");
export const retired = new JobOffer(new Job('Retired', 0, {}, {}), "Home");

export const cars = [
  new Car('Ford Fairlane', 1960, 15000, 2400, 95, '3.7 L'),
  new Car('Ford Fairlane', 1964, 20000, 2400, 280, '4.7 L'),
  new Car('Chevrolet Chevelle mk I', 1964, 85000, 26000, 360, '5.0 L'),
  new Car('Chevrolet Chevelle mk II', 1970, 110000, 30000, 400, '5.4 L'),
  new Car('BMW Series 3', 1975, 30000, 5000, 140, '1.6 L'),
  new Car('BMW Series 3', 1981, 33000, 3000, 180, '2.3 L'),
  new Car('BMW Series 3', 1986, 50000, 8000, 200, '2.3 L'),
  new Car('BMW Series 3', 1994, 35000, 2000, 192, '2.5 L'),
  new Car('BMW Series 3 E36', 2004, 45000, 1500, 150, '2.0 L'),
  new Car('BMW Series 3 E46', 2004, 55000, 2500, 204, '3.0 L'),
  new Car('BMW Series 3 E90', 2008, 55000, 3000, 254, '3.0 L'),
  new Car('BMW Series 3 E90', 2008, 45000, 2000, 185, '2.0 L'),
  new Car('Mercedes-Benz A140', 1997, 30000, 3000, 82, '1.4 L'),
  new Car('Mercedes-Benz A210 Evolution', 1999, 40000, 6000, 140, '2.1 L'),
  new Car('Mercedes-Benz 220SB', 1963, 40000, 15000, 110, '2.2 L'),
  new Car('Mercedes-Benz 220SEB', 1967, 48000, 18000, 120, '2.2 L'),
  new Car('Mercedes-Benz 280S W108', 1969, 50000, 19500, 140, '2.8 L'),
  new Car('Mercedes-Benz 230 SL Pagoda', 1965, 53000, 19000, 150, '2.3 L'),
  new Car('Volkswagen T1', 1964, 9000, 1500, 42, '1.5 L'),
  new Car('Chevrolet Camaro', 1968, 120000, 38000, 400, '5.7 L'),
  new Car('Chevrolet Corvette C3', 1968, 124000, 40000, 390, '7.0 L'),
  new Car('Ford Mustang', 1968, 60000, 21000, 210, '4.9 L'),
  new Car('Ford Mustang GT Fastback', 1966, 65000, 22000, 225, '4.7 L'),
  new Car('Volvo 1800S', 1968, 45000, 16500, 115, '1.8 L'),
  new Car('Aston Martin DB5', 1965, 85000, 27000, 280, '4.0 L'),
  new Car('Jaguar Pirana', 1967, 80000, 24500, 265, '4.2 L'),
  new Car('Ford Mustang Mach I', 1969, 97000, 29000, 335, '7.0 L'),
  new Car('Caddilac Fleetwood', 1966, 98000, 29500, 340, '7.0 L'),
  new Car('Volkswagen Garbus', 1969, 8500, 1400, 40, '1.3 L'),
  new Car('Renault R8', 1966, 9400, 2300, 48, '1.1 L'),
  new Car('Citroen 2CV Sahara', 1963, 4500, 1100, 20, '0.5 L'),
  new Car('Fiat 500F', 1967, 4300, 1000, 18, '0.5 L'),
  new Car('Jaguar XJ13 Tempero', 1966, 6500000, 6000000, 500, '5.3 L'),
  new Car('Ferrari 330 GTC Zagato', 1967, 300000, 150000, 300, '4.0 L'),
  new Car('Nissan Skyline 2000 GT-R', 1969, 67000, 23000, 160, '2.0 L'),
  new Car('Fiat 130 Coupe', 1974, 59000, 19500, 165, '3.0 L'),
  new Car('Mercedes 250 CE', 1970, 59000, 18500, 150, '2.5 L'),
  new Car('Polish Fiat 125p', 1972, 11000, 2000, 55, '1.3 L'),
  new Car('BMW 2800 E3', 1970, 61000, 20000, 170, '2.8 L'),
  new Car('Chevrolet Corvette C3', 1973, 67500, 20600, 200, '5.7 L'),
  new Car('Citroen CX 2000 Super', 1975, 25000, 5000, 104, '2.0 L'),
  new Car('Matra Simka Bagheera', 1977, 15000, 2100, 84, '1.4 L'),
  new Car('MG Midget MK III', 1974, 12500, 2060, 65, '1.3 L'),
  new Car('Dodge Challenger', 1970, 73000, 22500, 233, '5.2 L'),
  new Car('Mercedes 230 W 123', 1978, 38000, 14800, 109, '2.3 L'),
  new Car('Mercedes 280 SL', 1970, 61500, 20880, 170, '2.8 L'),
  new Car('BMW 1502', 1975, 18000, 5000, 85, '1.6 L'),
  new Car('Nissan Sunny GTF Coupe', 1988, 45000, 15000, 110, '1.6 L'),
  new Car('Mercedes 300 SE W 126', 1987, 63000, 30350, 180, '3.0 L'),
  new Car('Ferrari Martial', 1988, 484500, 470000, 276, '3.2 L'),
  new Car('BMW 323i E21', 1981, 63000, 27500, 143, '2.3 L'),
  new Car('Citroen 2CV 6 Club', 1980, 6000, 1200, 29, '0.6 L'),
  new Car('Bitta SC', 1984, 63000, 30250, 180, '3.0 L'),
  new Car('Mercedes 300 SE W 126', 1986, 65000, 30250, 180, '3.0 L'),
  new Car('Porsche 928S', 1987, 100000, 50000, 310, '4.7 L'),
];

export const generateCars = (user, currentYear) => {
  const carSuggestions = filter(cars, car => (car.yearOfProduction <= currentYear));
  const carsToBuy = [];
  for (let i = 0; i<15; i+=1) {
    const sampleCar = sample(carSuggestions);
    carsToBuy.push(new CarOffer(sampleCar, currentYear));
  }
  return carsToBuy;
};

export const birthMateOffset = 4;
export const skillMateOffset = 2;
export const LOVE_RELATION = 1;
export const FRIENDS_RELATION = 2;
export const FAMILY_RELATION = 3;
export const MATES_RELATION = 4;
