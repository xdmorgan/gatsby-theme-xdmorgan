import getSchema from "./schema";

const site = {
  organization: "Dan Morgan",
  description: "Front End Engineer in Washington D.C.",
  logo: "https://danny.codes/icons/icon-256x256.png",
  title: "danny.codes",
  url: "https://danny.codes"
};

describe("JSON-LD Schemas", () => {
  test("The homepage has only website schema", () => {
    const options = {
      page: {
        description: "Front End Engineer in Washington D.C.",
        image: "https://danny.codes/icons/icon-512x512.png",
        title: "Home",
        url: "https://danny.codes"
      },
      site
    };

    const schema = getSchema(options);
    expect(schema).toHaveLength(1);
    expect(schema[0]["@type"]).toBe("WebSite");
    expect(schema).toMatchSnapshot();
  });
  test("An internal page has website and breadcrumb schemas", () => {
    const options = {
      page: {
        description: "This is an internal page description",
        image: "https://danny.codes/icons/icon-512x512.png",
        title: "About",
        url: "https://danny.codes/about"
      },
      site
    };

    const schema = getSchema(options);
    expect(schema).toHaveLength(2);
    expect(schema[0]["@type"]).toBe("WebSite");
    expect(schema[1]["@type"]).toBe("BreadcrumbList");
    expect(schema).toMatchSnapshot();
  });
  test("An editorial content page has website, breadcrumb, and blog post schemas", () => {
    const options = {
      page: {
        description: "This is a mock blog post description",
        image: "https://danny.codes/icons/icon-512x512.png",
        title: "Hello, world!",
        url: "https://danny.codes/blog/hello-world",
        blogPost: {
          author: "Dan Morgan",
          datePublished: "2019/01/21"
        }
      },
      site
    };

    const schema = getSchema(options);
    expect(schema).toHaveLength(3);
    expect(schema[0]["@type"]).toBe("WebSite");
    expect(schema[1]["@type"]).toBe("BreadcrumbList");
    expect(schema[2]["@type"]).toBe("BlogPosting");
    expect(schema).toMatchSnapshot();
  });
});
