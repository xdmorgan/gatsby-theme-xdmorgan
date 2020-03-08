import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import { Location } from "@reach/router";
import getSchema from "./schema";

interface Props {
  schema?: boolean;
  blogPost?: { author: string; datePublished: string };
  description?: string;
  image?: string;
  keywords?: string[];
  lang?: string;
  title?: string;
  canonical?: string;
  appendTitle?: boolean;
}

interface SiteMeta {
  title: string;
  description: string;
  logo: string;
  keywords: string[];
  organization: string;
  twitter: string;
  url: string;
}

const mergeTitles = (page: string = "", base: string) =>
  page ? `${page} | ${base}` : base;

const hasLeadingSlashes = (url: string) => url.slice(0, 2) === "//";

/**
 * SEO utility wrapper (powered by react-helmet)
 * Remixed but inspired by:
 * - gatsby-default-starter [`seo.js`](https://github.com/gatsbyjs/gatsby-starter-default/blob/master/src/components/seo.js)
 * - Khalil Stemmler's SEO [best practices article](https://khalilstemmler.com/blog/how-to-optimize-your-gatsby-blog-for-seo/)
 */

export default function SEO(props: Props) {
  return (
    <Location>
      {({ location }) => (
        <StaticQuery
          query={detailsQuery}
          render={data => {
            const query: SiteMeta = data.sitePlugin.pluginOptions.seo;
            const options = {
              site: {
                url: query.url,
                title: query.title,
                description: query.description,
                logo: query.logo,
                organization: query.organization
              },
              page: {
                blogPost: props.blogPost,
                description: props.description || query.description,
                image: props.image || query.logo,
                title: props.appendTitle
                  ? mergeTitles(props.title, query.title)
                  : props.title,
                url: query.url + location.pathname
              }
            };
            const imageWithProtocol =
              (hasLeadingSlashes(options.page.image) ? "https:" : "") +
              options.page.image;
            return (
              <Helmet
                htmlAttributes={{ lang: props.lang }}
                title={options.page.title}
              >
                {/* General tags */}
                <meta name="description" content={options.page.description} />
                <meta
                  name="keywords"
                  content={(props.keywords || query.keywords).join(`, `)}
                />
                <meta name="image" content={imageWithProtocol} />
                {/* Schema.org tags */}
                {!props.canonical ? null : (
                  <link rel="canonical" href={props.canonical} />
                )}
                {/* Schema.org tags */}
                {!props.schema ? null : (
                  <script type="application/ld+json">
                    {JSON.stringify(getSchema(options))}
                  </script>
                )}
                {/* OpenGraph tags */}
                <meta property="og:url" content={options.page.url} />
                {options.page.blogPost ? (
                  <meta property="og:type" content="article" />
                ) : null}
                <meta property="og:title" content={options.page.title} />
                <meta
                  property="og:description"
                  content={options.page.description}
                />
                <meta property="og:image" content={imageWithProtocol} />
                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content={query.twitter} />
                <meta name="twitter:title" content={options.page.title} />
                <meta
                  name="twitter:description"
                  content={options.page.description}
                />
                <meta name="twitter:image" content={imageWithProtocol} />
              </Helmet>
            );
          }}
        />
      )}
    </Location>
  );
}

SEO.defaultProps = {
  lang: `en`,
  schema: false,
  appendTitle: true
};

const detailsQuery = graphql`
  query SEOComponentQuery {
    sitePlugin(name: { eq: "gatsby-theme-xdmorgan" }) {
      pluginOptions {
        seo {
          description
          keywords
          logo
          organization
          title
          twitter
          url
        }
      }
    }
  }
`;
