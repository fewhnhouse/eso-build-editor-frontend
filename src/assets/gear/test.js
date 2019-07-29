const fs = require("fs");

fs.readdirSync(".").forEach(filename => {
  if (filename.includes("abahswatch")) {
    const split = filename.split("abahswatch_");
    fs.renameSync(filename, split[0] + "_" + split[1]);
  }
});
