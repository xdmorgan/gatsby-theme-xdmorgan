const THEME_NAME = "gatsby-theme-xdmorgan";
const NO_GTAG = "gtag analytics UA code missing in config object";

const log = (msg, tag = THEME_NAME) => `${tag}: ${msg}`;

module.exports = ({ gtag }) => {
  // eslint-disable-next-line
  if (!gtag) console.warn(log(NO_GTAG));
  return {
    plugins: [
      `gatsby-plugin-typescript`,
      `gatsby-plugin-sass`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      `gatsby-plugin-layout`,
      {
        resolve: `gatsby-plugin-google-gtag`,
        options: {
          trackingIds: [gtag]
        },
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0
        }
      }
    ]
  };
};
