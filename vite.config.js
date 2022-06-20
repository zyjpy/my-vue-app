// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    AutoImport({
    resolvers: [ElementPlusResolver()],
  }),Components({
    resolvers: [ElementPlusResolver()],
  })],

  server: {
    //使用IP能访问
      host: '0.0.0.0'
    }
})