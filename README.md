# Vue3 Admin 后台管理系统

## 简介

Vue3 Admin 是一个基于 Vue3 + Vite + TypeScript + Element Plus + Pinia 的后台管理系统模板。它提供了丰富的功能组件和开箱即用的解决方案，帮助开发者快速搭建企业级后台应用。

## 特性

- **最新技术栈**：基于 Vue3、Vite、TypeScript、Pinia 等最新技术栈开发。
- **组件丰富**：集成 Element Plus UI 组件库，并封装了常用的业务组件。
- **权限管理**：完善的路由权限控制机制（RBAC 模型）。
- **主题定制**：支持暗黑模式和主题色配置。
- **数据大屏**：内置数据大屏适配方案。
- **SVG 图标**：自动导入 SVG 图标，使用方便。
- **Mock 数据**：内置 Mock.js，脱离后端独立开发。

## 预览

*(在此处添加项目截图)*

## 快速开始

### 环境准备

- Node.js >= 16.0.0
- pnpm >= 8.0.0

### 安装依赖

`ash
pnpm install
``n
### 启动开发服务器

`ash
pnpm dev
``n
### 构建生产环境

`ash
pnpm build
``n
### 代码规范检查

`ash
pnpm lint
``n
## 目录结构

``n─ public/              # 静态资源
 src/                 # 源代码
    api/             # 接口请求
    assets/          # 静态资源
    components/      # 公共组件
    layout/          # 布局组件
   ├ router/          # 路由配置
    store/           # 状态管理
    styles/          # 全局样式
    utils/           # 工具函数
    views/           # 页面文件
    App.vue          # 入口组件
    main.ts          # 入口文件
    permission.ts    # 权限控制
 .env.development     # 开发环境配置
 .env.production      # 生产环境配置
 vite.config.ts       # Vite 配置
 package.json         # 项目配置
``n
## 贡献

欢迎提交 Pull Request 或 Issue。

## 许可证

[MIT](LICENSE)
