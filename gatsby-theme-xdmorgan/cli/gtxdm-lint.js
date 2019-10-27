#!/usr/bin/env node
const program = require("commander");
const path = require("path");
const spawn = require("cross-spawn");

const callerwd = process.cwd();

function eslint(p = ".") {
  const config = ["--config", path.join(__dirname, "..", ".eslintrc.json")];
  const extensions = ["--ext", "js,jsx,ts,tsx"];
  const cmd = ["eslint", path.join(callerwd, p), ...config, ...extensions];

  spawn.sync("yarn", cmd, { stdio: "inherit" });
}

program
  .version("0.1.0")
  .action(eslint)
  .parse(process.argv);
