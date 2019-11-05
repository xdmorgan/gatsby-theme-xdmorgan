import React from "react";
import { SEO } from "gatsby-theme-xdmorgan";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div>
      <SEO />
      {children}
    </div>
  );
}
