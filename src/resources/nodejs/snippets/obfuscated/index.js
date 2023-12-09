const Ox5 = require("fs");
const { Ox6 } = require("./Ox0/Ox1");
const Ox7 = require("./Ox2/Ox3");

const Ox8 = (Ox9, Ox10) => {
  const Ox11 = Ox6(Ox9, Ox10);
  Ox5.writeFileSync("sayHi.txt", Ox11);
  console.log(`${Ox7.Ox12} ${Ox11}!`);
};

Ox8();
