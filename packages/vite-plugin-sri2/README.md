# vite-plugin-sri2

Vite Plugin SRI2 adds [Subresource Integrity (SRI)](https://developer.mozilla.org/ja/docs/Web/Security/Subresource_Integrity) to the `<script>` and `<link>` elements in your "index.html" file during at build time.

Below are examples of how the `<script>` and `<link>` elements in your built "index.html" file would look like after SRI attributes have been added:  
<img width="1039" alt="スクリーンショット 2023-08-22 8 58 51" src="https://github.com/keita-hino/vue-tsc-action/assets/15973671/d32422ed-a248-440b-a320-99e253909a3e">

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

## Options

### hashFunctionName

- Type : `string`
- Default : `sha256`

The supported hash functions are `SHA-256`, `SHA-384`, and `SHA-512`.  
This is in compliance with the [W3C specification](https://www.w3.org/TR/SRI/#cryptographic-hash-functions).

> Conformant user agents must support the SHA-256, SHA-384 and SHA-512 cryptographic hash functions for use as part of a request’s integrity metadata and may support additional hash functions.

## License

[MIT](./LICENSE)
