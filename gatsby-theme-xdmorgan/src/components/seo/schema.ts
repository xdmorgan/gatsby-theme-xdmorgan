type BlogPostOptions = {
  author: string;
  datePublished: string;
};

type PageOptions = {
  description: string;
  image: string;
  title: string;
  url: string;
};

type SiteOptions = {
  description: string;
  logo: string;
  organization: string;
  title: string;
  url: string;
};

const getWebsiteSchema = ({
  page,
  site
}: {
  page: PageOptions;
  site: SiteOptions;
}) => ({
  "@context": "http://schema.org",
  "@type": "WebSite",
  url: page.url,
  name: page.title,
  alternateName: site.title,
  image: {
    "@type": "ImageObject",
    url: site.logo
  }
});

const getBreadcrumbSchema = ({
  page,
  site
}: {
  page: PageOptions;
  site: SiteOptions;
}) => ({
  "@context": site.url,
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@id": page.url,
        name: page.title,
        image: page.image
      }
    }
  ]
});

const getBlogPostSchema = ({
  page,
  site
}: {
  page: PageOptions & { blogPost: BlogPostOptions };
  site: SiteOptions;
}) => ({
  "@context": site.url,
  "@type": "BlogPosting",
  url: page.url,
  name: page.title,
  alternateName: site.title,
  headline: page.title,
  image: {
    "@type": "ImageObject",
    url: page.image
  },
  description: page.description,
  author: {
    "@type": "Person",
    name: page.blogPost.author
  },
  publisher: {
    "@type": "Organization",
    url: site.url,
    logo: site.logo,
    name: site.organization
  },
  mainEntityOfPage: {
    "@type": "WebSite",
    "@id": site.url
  },
  datePublished: page.blogPost.datePublished
});

export default ({
  page,
  site
}: {
  page: PageOptions & { blogPost?: BlogPostOptions };
  site: SiteOptions;
}) => {
  return [
    // Always include the base website schema
    getWebsiteSchema({ page, site }),
    // Add breadcrumb schema unless we're on the home page
    ...(page.url.replace(/\/$/, "") !== site.url.replace(/\/$/, "")
      ? [getBreadcrumbSchema({ page, site })]
      : []),
    // if on editorial content page add BlogPosting schema
    // @ts-ignore
    ...(page.blogPost ? [getBlogPostSchema({ page, site })] : [])
  ];
};
