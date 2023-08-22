import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { sri } from 'vite-plugin-sri2';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sri()]
});
