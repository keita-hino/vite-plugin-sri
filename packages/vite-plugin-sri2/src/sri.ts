import { createHash } from 'crypto';

export function calculateSRI(content: string | Uint8Array) {
  const hash = createHash('sha256').update(content).digest('base64');
  return `sha256-${hash}`;
}
