const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

const LAYOUT_TEMPLATE = `//import React from "react";

export default function Layout({ children }) {
  return children;
}
`;

exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState();

  // basePath = themeOptions.basePath || `/`;
  const layoutPath = themeOptions.layoutPath || `src/layouts/`;

  const dirs = [path.join(program.directory, layoutPath)];

  dirs.forEach(dir => {
    console.log(`Initializing ${dir} directory`);
    if (!fs.existsSync(dir)) mkdirp.sync(dir);
  });

  const files = [
    { dir: layoutPath, name: "index.tsx", content: LAYOUT_TEMPLATE }
  ];

  files.forEach(({ dir, name, content }) => {
    console.log(`Initializing ${dir + name} file`);
    const p = path.join(dir, name);
    if (!fs.existsSync(p)) fs.writeFileSync(p, content);
  });
};
