import { describe, it, expect } from 'vitest';
import { calculateSRI } from '../src/sri';

describe('calculateSRI', () => {
  const content = 'Hello World!';

  describe.each([
    { hashFunctionName: 'sha256', expected: 'sha256-f4OxZX/x/FO5LcGBSKHWXfwtSx+j1ncoSt3SABJtkGk=' },
    {
      hashFunctionName: 'sha384',
      expected: 'sha384-v9dsDrvQBv7lg0EFR8GIewKSvnbVgtlsJC0qeScj4/1v0GH51c/RO4+WE1jmrbpK'
    },
    {
      hashFunctionName: 'sha512',
      expected:
        'sha512-hhhE1nBOhXP+w02WfiC8/vPUJM9IvgTm3AjyvVjHKXQzcQFerYkcw88cnTS0kmS1EHUbH/nlN5N7xGtdb/TsyA=='
    }
  ] as const)(
    'describe object add($hashFunctionName, $expected)',
    ({ hashFunctionName, expected }) => {
      it(`should generate the correct SRI hash using the ${hashFunctionName} hash function for the given conten`, () => {
        const sriHash = calculateSRI(hashFunctionName, content);
        expect(sriHash).toBe(expected);
      });
    }
  );
});
