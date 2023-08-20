import { defineConfig } from 'vite';
import { sri } from 'vite-plugin-sri';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [sri()]
});
