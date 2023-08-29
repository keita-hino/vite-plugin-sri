import { describe, it, expect } from 'vitest';
import { calculateSRI } from '../src/sri';

describe('calculateSRI', () => {
  it('should generate correct SRI hash for given content', () => {
    const content = 'Hello World!';
    const expectedHash = 'sha256-f4OxZX/x/FO5LcGBSKHWXfwtSx+j1ncoSt3SABJtkGk=';

    const sriHash = calculateSRI(content);
    expect(sriHash).toBe(expectedHash);
  });
});
