#!/usr/bin/env node
const program = require("commander");
const path = require("path");
const spawn = require("cross-spawn");

const callerwd = process.cwd();

program.version("0.1.0");

program.command("lint [path]").action((p = ".") => {
  const config = ["--config", path.join(__dirname, "..", ".eslintrc.json")];
  const extensions = ["--ext", "js,jsx,ts,tsx"];
  const cmd = ["eslint", path.join(callerwd, p), ...config, ...extensions];

  spawn.sync("yarn", cmd, { stdio: "inherit" });
});

program.command("test [path]").action((p = "src") => {
  const cmd = ["jest", path.join(callerwd, p)];

  spawn.sync("yarn", cmd, { stdio: "inherit" });
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
