import React from "react";
import { Link } from "gatsby-theme-xdmorgan";

export default function Header() {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="https://github.com/xdmorgan/gatsby-theme-xdmorgan">GitHub</Link>
    </header>
  );
}
