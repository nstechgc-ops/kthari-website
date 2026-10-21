export default {
  layout: "post.njk",
  permalink: "/news/{{ page.fileSlug }}.html",
  ogType: "article",
  nav: "news",
  eleventyComputed: {
    seoTitle: (d) => `${d.title} — K'Thari`,
    seoDescription: (d) => d.summary,
    shareImage: (d) => d.image,
  },
};
