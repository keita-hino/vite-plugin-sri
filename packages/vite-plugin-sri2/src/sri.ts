import { createHash } from 'crypto';
import { StandardHashFunctionName } from './grobals';

export function calculateSRI(
  hashFunctionName: StandardHashFunctionName,
  content: string | Uint8Array
) {
  const hash = createHash(hashFunctionName).update(content).digest('base64');
  return `${hashFunctionName}-${hash}`;
}
