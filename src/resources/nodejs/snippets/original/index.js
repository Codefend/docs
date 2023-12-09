const fs = require("fs");
const { fullName } = require("./lib/user");
const constants = require("./utils/constants");

const sayHi = (firstName, lastName) => {
  const name = fullName(firstName, lastName);
  fs.writeFileSync("sayHi.txt", name);
  console.log(`${constants.greeting} ${name}!`);
};

sayHi();