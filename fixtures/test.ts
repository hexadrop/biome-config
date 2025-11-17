const arr = [
	  1,
	  2
];

const value = "hello";

const fil = arr.filter((num) => num > 1);
const fil2 = arr.filter((_num, index) => index % 2 === 0);

console.log(fil);
console.log(fil2);

console.log(`${value} world`);
