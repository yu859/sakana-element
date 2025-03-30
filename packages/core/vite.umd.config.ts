import { defineConfig } from 'vite'; //vite的defineConfig
import vue from '@vitejs/plugin-vue'; //vue插件，不引入jsx是因为jsx只在测试中使用
import { resolve } from 'path'; //路径解析

export default defineConfig({
  plugins: [vue()], //插件
  build: {
    //构建配置
    outDir: 'dist/umd', //输出目录
    lib: {
      //库配置
      entry: resolve(__dirname, './index.ts'), //入口文件
      name: 'SakanaElement', //库名
      fileName: 'index', //文件名
      formats: ['umd'], //格式
    },
    rollupOptions: {
      //rollup配置,rollup是vite的打包工具
      external: ['vue'], //外部依赖，为了让用户安装时只要额外安装vue即可，导致包会变大
      output: {
        //输出配置
        exports: 'named', //导出方式
        globals: {
          // 为外部依赖指定全局变量名，当使用 UMD 格式时，外部依赖需要通过全局变量获取
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          // 如果是 style.css 文件，则重命名为 index.css
          if (assetInfo.name === 'style.css') return 'index.css';
          return assetInfo.name as string;
        },
      },
    },
  },
});
