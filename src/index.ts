import type { Plugin } from "vite";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import prettier from "prettier";
import { cp, rm, mkdir } from "fs/promises";

/**
 * 处理vue ssr渲染
 * @param {object} components 组件
 * @returns {object} 插件
 */
export function htmlVueSsr(props: Record<string, any>): Plugin {
  return {
    name: "vite-plugin-html-vue-ssr",
    async transformIndexHtml(html) {
      const app = createSSRApp({ template: html, ...props });
      const page = await renderToString(app);
      return htmlVueSsrDeleteNote(page);
    },
  };
}

/**
 * prettier格式化html
 * @param {object} config 配置prettier
 * @returns {object} 插件
 */
export function htmlVueSsrPrettier(config = {}): Plugin {
  return {
    name: "vite-plugin-html-vue-ssr-prettier",
    async transformIndexHtml(html) {
      const page = prettier.format(html, { ...config, parser: "html" });
      return page;
    },
  };
}

/**
 * 复制目录
 * @param {string} src 源目录
 * @param {string} dest 目标目录
 * @returns {object} 插件
 *
 * 说明：
 * 1. 先删除目标目录，再创建目标目录，最后复制源目录到目标目录
 */
export function htmlVueSsrCopy({
  src,
  dest,
}: {
  src: string;
  dest: string;
}): Plugin {
  return {
    name: "vite-plugin-html-vue-ssr-copy",
    async writeBundle() {
      try {
        await rm(dest, { recursive: true, force: true });
        await mkdir(dest, { recursive: true });
        await cp(src, dest, { recursive: true });
      } catch (error) {
        console.error("复制目录失败:", error);
      }
    },
  };
}

/**
 * 删除html中的注释信息
 * @param {string} html html字符串
 * @returns {string} 处理后的html字符串
 */
export function htmlVueSsrDeleteNote(html: string) {
  return html.replace(
    /<!-- prettier-ignore-start -->|<!-- prettier-ignore-end -->|<!---->|<!--\[-->|<!--\]-->/g,
    ""
  );
}
