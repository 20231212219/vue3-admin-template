import { fileURLToPath, URL } from 'node:url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取各种环境下的环境变量
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        enable: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    }, // scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variable.scss" as *;`,
        },
      },
    },
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取服务器地址设置
          target: env.VITE_SERVE,
          // 是否需要代理跨域(一般需要)
          changeOrigin: true,
          // 路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  } // ⬅️ 补充在这里！这是 return 语句中配置对象的结束括号
}) // ⬅️ 这是函数定义的结束括号
