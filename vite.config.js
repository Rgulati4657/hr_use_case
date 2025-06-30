// ✅ CORRECT for Vercel
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});

// The NEW and CORRECT vite.config.js for your project

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // Any request from your React app starting with "/api"
//       // will be forwarded to the target address.
//       '/api': {
//         // target: 'http://192.168.1.7:8085', // Your Flask backend
//         target: 'https://hejdgen-559132211786.asia-south1.run.app', // Your Flask backend
//         changeOrigin: true,
//         // No rewrite needed since your backend routes also start with /api
//       },
//     },
//   },
// });