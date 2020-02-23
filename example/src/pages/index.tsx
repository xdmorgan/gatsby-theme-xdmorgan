import React from "react";
import { SEO } from "gatsby-theme-xdmorgan";
import styles from "./index.module.scss";
import Header from "../components/header";

export default function Page() {
  return (
    <>
      <SEO title="Home" />
      <Header />
      <div className={styles.test}>Homepage in a user&rsquo;s site.</div>
    </>
  );
}
