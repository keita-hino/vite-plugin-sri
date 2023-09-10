export const pluginName = 'vite-plugin-sri2';
// https://www.w3.org/TR/2016/REC-SRI-20160623/#cryptographic-hash-functions
export const standardHashFunctionNames = ['sha256', 'sha384', 'sha512'] as const;
export type StandardHashFunctionName = (typeof standardHashFunctionNames)[number];
