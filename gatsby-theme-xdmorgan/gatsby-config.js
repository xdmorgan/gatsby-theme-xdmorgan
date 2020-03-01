const THEME_NAME = "gatsby-theme-xdmorgan";
const NO_GTAG = "gtag analytics UA code missing in config object";
const NO_FONTS = "no google fonts sources were provided, that's cool";
const NO_FILESYSTEM = "no gatsby-source-filesystem locations provided";

const log = (msg, tag = THEME_NAME) => `${tag}: ${msg}`;

module.exports = ({ gtag, gfonts, manifest, filesystem }) => {
  if (!gtag) console.warn(log(NO_GTAG));
  if (!manifest) console.warn(log(NO_GTAG));
  if (!gfonts) console.info(log(NO_FONTS));
  if (!filesystem) console.info(log(NO_FILESYSTEM));
  return {
    plugins: [
      `gatsby-plugin-typescript`,
      `gatsby-plugin-sass`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      `gatsby-plugin-layout`,
      `gatsby-plugin-react-helmet`,
      ...(filesystem || []).map(options => ({
        resolve: `gatsby-source-filesystem`,
        options
      })),
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [`gatsby-remark-images`, `gatsby-remark-autolink-headers`]
        }
      },
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 1200,
                linkImagesToOriginal: false
              }
            },
            `gatsby-remark-autolink-headers`
          ]
        }
      },
      {
        resolve: `gatsby-plugin-google-gtag`,
        options: {
          trackingIds: [gtag]
        },
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0
        }
      },
      manifest
        ? {
            resolve: `gatsby-plugin-manifest`,
            options: manifest
          }
        : null,
      gfonts
        ? {
            resolve: `gatsby-plugin-google-fonts`,
            options: { fonts: gfonts }
          }
        : null
    ].filter(config => config !== null)
  };
};
