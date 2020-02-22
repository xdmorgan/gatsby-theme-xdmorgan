import * as React from "react";
import { Link as GatsbyLink } from "gatsby";

export default function Link({
  children,
  to,
  activeClassName,
  ...props
}: {
  children: React.ReactNode;
  to: string;
  activeClassName?: string;
  [props: string]: any;
}) {
  // if its a relative link, use Gatsby's Link
  const internal = /^\/(?!\/)/.test(to);
  // if its a relative but to a file (instead of a route) link to it normally
  const file = /\.[0-9a-z]+$/i.test(to);
  // handle non-route links
  if (file || !internal) {
    return (
      <a href={to} {...props}>
        {children}
      </a>
    );
  }
  // router links
  return (
    <GatsbyLink to={to} activeClassName={activeClassName} {...props}>
      {children}
    </GatsbyLink>
  );
}
