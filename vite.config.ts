import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Under GitHub Actions (CI) the site is served from a project subpath
  // (https://USER.github.io/ModAra/), so we need a base of '/ModAra/'.
  // Locally (dev + preview) we keep the root base so the live preview works.
  base: process.env.CI ? '/ModAra/' : '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
