// src/index.ts
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import prettier from "prettier";
import { cp, rm, mkdir } from "fs/promises";
function htmlVueSsr(props) {
  return {
    name: "vite-plugin-html-vue-ssr",
    async transformIndexHtml(html) {
      const app = createSSRApp({ template: html, ...props });
      const page = await renderToString(app);
      return htmlVueSsrDeleteNote(page);
    }
  };
}
function htmlVueSsrPrettier(config = {}) {
  return {
    name: "vite-plugin-html-vue-ssr-prettier",
    async transformIndexHtml(html) {
      const page = prettier.format(html, { ...config, parser: "html" });
      return page;
    }
  };
}
function htmlVueSsrCopy({
  src,
  dest
}) {
  return {
    name: "vite-plugin-html-vue-ssr-copy",
    async writeBundle() {
      try {
        await rm(dest, { recursive: true, force: true });
        await mkdir(dest, { recursive: true });
        await cp(src, dest, { recursive: true });
      } catch (error) {
        console.error("\u590D\u5236\u76EE\u5F55\u5931\u8D25:", error);
      }
    }
  };
}
function htmlVueSsrDeleteNote(html) {
  return html.replace(
    /<!-- prettier-ignore-start -->|<!-- prettier-ignore-end -->|<!---->|<!--\[-->|<!--\]-->/g,
    ""
  );
}
export {
  htmlVueSsr,
  htmlVueSsrCopy,
  htmlVueSsrDeleteNote,
  htmlVueSsrPrettier
};
