# vite-plugin-sri

This is a Vite plugin for adding [Subresource Integrity](https://developer.mozilla.org/ja/docs/Web/Security/Subresource_Integrity).

## Installation

```bash
pnpm i -D @keita-hino/vite-plugin-sri
```

## Usage

### add to vite config

```ts
// vite config
import { defineConfig } from 'vite';
import { sri } from '@keita-hino/vite-plugin-sri';

export default defineConfig({
  plugins: [sri()]
});
```

## License

[MIT](./LICENSE)
