import { Plugin } from 'vite';

/**
 * 处理vue ssr渲染
 * @param {object} components 组件
 * @returns {object} 插件
 */
declare function htmlVueSsr(props: Record<string, any>): Plugin;
/**
 * prettier格式化html
 * @param {object} config 配置prettier
 * @returns {object} 插件
 */
declare function htmlVueSsrPrettier(config?: {}): Plugin;
/**
 * 复制目录
 * @param {string} src 源目录
 * @param {string} dest 目标目录
 * @returns {object} 插件
 *
 * 说明：
 * 1. 先删除目标目录，再创建目标目录，最后复制源目录到目标目录
 */
declare function htmlVueSsrCopy({ src, dest, }: {
    src: string;
    dest: string;
}): Plugin;
/**
 * 删除html中的注释信息
 * @param {string} html html字符串
 * @returns {string} 处理后的html字符串
 */
declare function htmlVueSsrDeleteNote(html: string): string;

export { htmlVueSsr, htmlVueSsrCopy, htmlVueSsrDeleteNote, htmlVueSsrPrettier };
