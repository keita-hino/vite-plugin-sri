import { createHash } from 'crypto';

// FIXME: type
export function calculateSRI(content: any) {
  const hash = createHash('sha256').update(content).digest('base64');
  return `sha256-${hash}`;
}
