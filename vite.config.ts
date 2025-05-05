import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'default',
      fileName: (format) => `index.${format}.js`,
      formats: ['es']
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'index.[ext]'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [{
    name: 'generate-json',
    closeBundle() {
      // 导入配置
      const configs = require('./dist/index.es.js');
      // 将配置转换为 JSON
      const jsonContent = JSON.stringify(configs.default, null, 2);
      // 写入 JSON 文件
      fs.writeFileSync(path.resolve(__dirname, 'dist/index.json'), jsonContent);
    }
  }]
});