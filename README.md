# vite-plugin-html-vue-ssr

一个用于处理 Vue SSR 渲染的 Vite 插件，提供 HTML 处理、格式化和目录复制等功能。

## 特性

- 支持 Vue SSR 渲染，将 Vue 组件渲染为 HTML
- 提供 HTML 格式化功能，基于 Prettier
- 支持目录复制功能，方便资源管理
- 支持 ES Module 和 CommonJS 模块系统
- 类型安全，提供完整的 TypeScript 类型定义

## 安装

```bash
npm install vite-plugin-html-vue-ssr --save-dev
```

```bash
yarn add vite-plugin-html-vue-ssr --dev
```

```bash
pnpm add vite-plugin-html-vue-ssr -D
```

## 依赖要求

- Vite >= 5.4.21
- Vue >= 3.5.26
- Node.js >= 18.0.0

## 使用示例

### 基础用法

```javascript
// vite.config.js
import { defineConfig } from "vite";
import { htmlVueSsr } from "vite-plugin-html-vue-ssr";

export default defineConfig({
  plugins: [
    htmlVueSsr({
      // 可选的 Vue 组件属性
    }),
  ],
});
```

### 完整配置

```javascript
// vite.config.js
import {
  htmlVueSsr,
  htmlVueSsrPrettier,
  htmlVueSsrCopy,
} from "vite-plugin-html-vue-ssr";

export default defineConfig({
  plugins: [
    htmlVueSsr({
      title: "index",
      // 可选的 Vue 组件属性
      components: {},
    }),
    htmlVueSsrPrettier({
      // Prettier 配置选项
      tabWidth: 2,
      semi: true,
    }),
    htmlVueSsrCopy({
      src: "assets",
      dest: "./dist/assets",
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        index: "./index.html",
      },
    },
  },
};
```

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
  </head>
  <body>
  </body>
</html>
```

## API 文档

### htmlVueSsr(props)

处理 Vue SSR 渲染的插件。

**参数**：

- `props`: `Record<string, any>` - 传递给 Vue 组件的属性

**返回值**：

- `Plugin` - Vite 插件对象

**描述**：
该插件会将 HTML 模板作为 Vue 组件的模板，并使用 `createSSRApp` 创建应用实例，然后通过 `renderToString` 将其渲染为最终的 HTML。

### htmlVueSsrPrettier(config)

使用 Prettier 格式化 HTML 的插件。

**参数**：

- `config`: `object` - Prettier 配置选项（可选）

**返回值**：

- `Plugin` - Vite 插件对象

**描述**：
该插件会使用 Prettier 格式化 HTML 内容，默认使用 HTML 解析器。

### htmlVueSsrCopy(options)

复制目录的插件。

**参数**：

- `options`: `object` - 配置选项
  - `src`: `string` - 源目录路径
  - `dest`: `string` - 目标目录路径

**返回值**：

- `Plugin` - Vite 插件对象

**描述**：
该插件会在构建完成后，先删除目标目录，然后创建目标目录，最后将源目录复制到目标目录。

### htmlVueSsrDeleteNote(html)

删除 HTML 中的特定注释的工具函数。

**参数**：

- `html`: `string` - HTML 字符串

**返回值**：

- `string` - 处理后的 HTML 字符串

**描述**：
该函数会删除 HTML 中的以下注释：

- `<!-- prettier-ignore-start -->`
- `<!-- prettier-ignore-end -->`
- `<!---->`
- `<!--[-->`
- `<!--]-->`

## 配置说明

### 插件顺序

建议按照以下顺序配置插件：

1. `htmlVueSsr` - 首先处理 Vue SSR 渲染
2. `htmlVueSsrPrettier` - 然后格式化 HTML
3. `htmlVueSsrCopy` - 最后复制目录（该插件只在构建时执行）

### Prettier 配置

`htmlVueSsrPrettier` 支持所有 Prettier 的配置选项，具体可以参考 [Prettier 文档](https://prettier.io/docs/en/options.html)。

## 注意事项

1. **版本兼容性**：确保使用与 Vite 5 和 Vue 3 兼容的版本
2. **Node.js 版本**：需要 Node.js 18.0.0 或更高版本
3. **构建输出**：插件会在构建时执行目录复制操作，请确保目标目录有正确的写入权限
4. **性能考虑**：HTML 格式化可能会增加构建时间，特别是对于大型项目
5. **模板语法**：在 HTML 文件中可以使用 Vue 的模板语法，如 `{{ title }}`
6. **组件注册**：如果需要在 HTML 模板中使用 Vue 组件，需要先在 `components` 属性中注册

## 使用场景

### 静态站点生成

结合 Vite 的静态站点生成功能，使用该插件可以轻松创建基于 Vue 的静态网站：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import { htmlVueSsr, htmlVueSsrPrettier } from 'vite-plugin-html-vue-ssr'

export default defineConfig({
  plugins: [
    htmlVueSsr({
      title: 'My Static Site',
      description: 'A beautiful static site built with Vue and Vite'
    }),
    htmlVueSsrPrettier()
  ],
  build: {
    rollupOptions: {
      input: {
        home: './index.html',
        about: './about.html'
      }
    }
  }
})
```


## 常见问题

### Q: 插件如何处理动态路由？
A: 该插件主要用于处理静态 HTML 页面的 SSR 渲染，对于动态路由，建议结合 Vue Router 和 Nuxt.js 等框架使用。

### Q: 如何在 HTML 模板中使用 Vue 组件？
A: 首先需要在 `htmlVueSsr` 插件的配置中注册组件，然后在 HTML 模板中使用：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import { htmlVueSsr } from 'vite-plugin-html-vue-ssr'
import MyComponent from './components/MyComponent.vue'

export default defineConfig({
  plugins: [
    htmlVueSsr({
      components: {
        MyComponent
      }
    })
  ]
})
```

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
  </head>
  <body>
    <my-component></my-component>
  </body>
</html>
```

### Q: 插件与其他 HTML 处理插件冲突怎么办？
A: 建议将该插件放在其他 HTML 处理插件之前，以确保正确处理 Vue SSR 渲染。

## 开发

### 安装依赖

```bash
npm install
```

### 构建

```bash
npm run build
```

### 测试

```bash
npm run test
```

## 许可证

ISC

## 贡献

欢迎提交 Issue 和 Pull Request！

## 作者

mojon
