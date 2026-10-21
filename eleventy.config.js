import markdownIt from "markdown-it";

const md = markdownIt({ html: false, breaks: false, linkify: true, typographer: true });

export default function (eleventyConfig) {
  // Copy static files straight through
  ["src/images", "src/styles.css", "src/favicon.svg", "src/robots.txt", "src/_headers"].forEach((p) =>
    eleventyConfig.addPassthroughCopy(p)
  );

  // Text typed in the editor -> paragraphs. Blank line = new paragraph, *word* = italic, **word** = bold.
  eleventyConfig.addFilter("md", (s) => (s ? md.render(String(s)) : ""));
  eleventyConfig.addFilter("mdInline", (s) => (s ? md.renderInline(String(s)) : ""));

  // YouTube link (any format) -> video id
  eleventyConfig.addFilter("youtubeId", (url) => {
    if (!url) return "";
    const m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : "";
  });

  eleventyConfig.addFilter("head", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("niceDate", (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("absUrl", (p, base) => (!p ? "" : /^https?:/.test(p) ? p : base.replace(/\/$/, "") + p));

  eleventyConfig.addCollection("news", (api) =>
    api.getFilteredByGlob("src/news/*.md").sort((a, b) => b.date - a.date)
  );

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
