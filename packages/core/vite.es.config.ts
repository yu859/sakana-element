import { defineConfig } from 'vite'; //vite的defineConfig
import vue from '@vitejs/plugin-vue'; //vue插件，不引入jsx是因为jsx只在测试中使用
import { resolve } from 'path'; //路径解析
import dts from 'vite-plugin-dts'; //dts插件，当用户安装并使用你的组件库时，TypeScript 能够自动找到这些声明文件，提供代码补全和类型检查功能。
import { readdirSync } from 'fs';
import { filter, map } from 'lodash-es';

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types',
    }),
  ], //插件
  build: {
    //构建配置
    outDir: 'dist/es', //输出目录
    lib: {
      //库配置
      entry: resolve(__dirname, './index.ts'), //入口文件
      name: 'SakanaElement', //库名
      fileName: 'index', //文件名
      formats: ['es'], //格式
    },
    rollupOptions: {
      //rollup配置,rollup是vite的打包工具
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        '@popperjs/core',
        'async-validator',
      ], //外部依赖,为了让用户安装时需要安装图标等依赖，导致包会变小
      output: {
        //输出配置
        assetFileNames: (assetInfo) => {
          // 如果是 style.css 文件，则重命名为 index.css
          if (assetInfo.name === 'style.css') return 'index.css';
          return assetInfo.name as string;
        },
        manualChunks(id) {
          //手动分包
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('/packages/hooks')) {
            return 'hooks';
          }
          if (id.includes('/packages/utils')) {
            return 'utils';
          }
          for (const item of getDirectoriesSync('../components/')) {
            if (id.includes(`/packages/components/${item}`)) {
              return item;
            }
          }
        },
      },
    },
  },
});
