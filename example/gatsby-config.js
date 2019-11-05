module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-xdmorgan",
      options: {
        gtag: "UA-1234",
        seo: {
          description: "This is a custom description",
          keywords: ["Some", "keywords", "for", "test", "purposes"],
          logo: "my-logo.png",
          organization: "@xdanmorgan",
          title: "Example Site",
          twitter: "@xdanmorgan",
          url: "https://danny.codes"
        }
      }
    }
  ]
};
