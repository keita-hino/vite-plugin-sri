import { defineConfig } from 'vite';
import { sri } from 'vite-plugin-sri2';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [sri()]
});
