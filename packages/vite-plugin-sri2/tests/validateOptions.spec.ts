import { describe, it, expect } from 'vitest';
import { validateOptions } from '../src/validateOptions';

describe('validateOptions', () => {
  it('should return an empty array for valid options', () => {
    const validOptions = {
      hashFunctionName: 'sha256'
    };

    const errorMessages = validateOptions(validOptions);

    expect(errorMessages).toEqual([]);
  });

  it('should return an error message for an invalid hashFunctionName', () => {
    const invalidOptions = {
      hashFunctionName: 'invalidHashFunction'
    };

    const errorMessages = validateOptions(invalidOptions);

    expect(errorMessages).toEqual(['"hashFunctionName" must be sha256, sha384, or sha512.']);
  });
});
