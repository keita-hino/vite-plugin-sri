import type { Options } from 'src';
import { standardHashFunctionNames, StandardHashFunctionName } from './grobals';

export const validateOptions = (options: Options) => {
  const errorMessages: string[] = [];
  if (!validateHashFunctionName(options.hashFunctionName)) {
    errorMessages.push('"hashFunctionName" must be sha256, sha384, or sha512.');
  }
  return errorMessages;
};
const validateHashFunctionName = (hashFunctionName: StandardHashFunctionName) =>
  standardHashFunctionNames.includes(hashFunctionName);
