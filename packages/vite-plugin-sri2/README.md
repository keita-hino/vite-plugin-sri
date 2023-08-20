# vite-plugin-sri2

This is a Vite plugin for adding [Subresource Integrity](https://developer.mozilla.org/ja/docs/Web/Security/Subresource_Integrity).

## Installation

```bash
pnpm i -D @keita-hino/vite-plugin-sri2
```

## Usage

### add to vite config

```ts
// vite config
import { defineConfig } from 'vite';
import { sri } from '@keita-hino/vite-plugin-sri2';

export default defineConfig({
  plugins: [sri()]
});
```

## License

[MIT](./LICENSE)
