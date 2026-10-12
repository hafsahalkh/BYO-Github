import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const authTarget = env.VITE_CONVEX_SITE_URL || env.VITE_CONVEX_URL?.replace('.convex.cloud', '.convex.site');
  const authProxy = {
    '/api/auth': {
      target: authTarget,
      changeOrigin: true,
    },
  };
  return {
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  preview: { proxy: authProxy },
  server: {
    proxy: authProxy,
    hmr: {
      overlay: false,
    },
    watch: {
      ignored: ['**/convex/_generated/**'],
    },
  },
  };
})
