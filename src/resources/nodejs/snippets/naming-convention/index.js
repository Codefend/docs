const l_fs = require("fs");
const { l_fullName } = require("./pkg-lib/file-user");
const l_constants = require("./pkg-utils/file-constants");

const l_sayHi = (l_firstName, l_lastName) => {
  const l_name = l_fullName(l_firstName, l_lastName);
  l_fs.writeFileSync("sayHi.txt", l_name);
  console.log(`${l_constants.l_greeting} ${l_name}!`);
};

l_sayHi();
