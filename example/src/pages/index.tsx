import React from "react";
import { SEO } from "gatsby-theme-xdmorgan";
import styles from "./index.module.scss";

export default function Page() {
  return (
    <>
      <SEO title="Home" />
      <div className={styles.test}>Homepage in a user&rsquo;s site.</div>
    </>
  );
}
