# vite-plugin-sri2

This is a Vite plugin for adding [Subresource Integrity](https://developer.mozilla.org/ja/docs/Web/Security/Subresource_Integrity).

## Installation

```bash
$ yarn add vite-plugin-sri2 -D

# or

$ npm install vite-plugin-sri2 -D

# or

$ pnpm install vite-plugin-sri2 -D
```

## Usage

### add to vite config

```ts
// vite config
import { defineConfig } from 'vite';
import { sri } from 'vite-plugin-sri2';

export default defineConfig({
  plugins: [sri()]
});
```

## License

[MIT](./LICENSE)
