const { forEach } = require('lodash');
const math = 2;
let x = 'y';

const ja = { imie: 'Mateusz', nazwisko: `Wej${Math.random() > 0.5 ? 'man' : 'nie'}`};
const { imie } = ja;
if (x === 1) {
  console.log(x)
} else {
  console.log(2)
}
x === 1 ? console.log(x) : console.log(2)
