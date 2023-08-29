import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { isThirdPartyAsset, fetchResource, getSourceFromBundle } from '../src/resourceHelpers';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import type { OutputBundle } from 'rollup';

describe('isThirdPartyAsset', () => {
  it('should return true for third party asset', () => {
    const src = 'http://example.com/script.js';
    const result = isThirdPartyAsset(src);
    expect(result).toBe(true);
  });

  it('should return false for internal asset', () => {
    const src = '/assets/script.js';
    const result = isThirdPartyAsset(src);
    expect(result).toBe(false);
  });
});

describe('fetchResource', () => {
  const server = setupServer();

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should fetch resource and return its content', async () => {
    const responseText = 'Resource content';
    server.use(
      rest.get('http://example.com/script.js', (_, res, ctx) => {
        return res(ctx.status(200), ctx.text(responseText));
      })
    );

    const src = 'http://example.com/script.js';
    const result = await fetchResource(src);

    expect(result).toBe(responseText);
  });

  it('should handle failed fetch and return an empty string', async () => {
    server.use(
      rest.get('http://example.com/script.js', (_, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    const src = 'http://example.com/script.js';
    const result = await fetchResource(src);

    expect(result).toBe('');
  });
});

// FIXME: type
const dummyOutputBundle = {
  'assets/style.css': {
    type: 'asset',
    source: 'Asset content'
  },
  'assets/script.js': {
    type: 'chunk',
    code: 'Chunk content'
  }
} as unknown as OutputBundle;

describe('getSourceFromBundle', () => {
  it('should return asset source when type is asset', () => {
    const src = '/assets/style.css';
    const result = getSourceFromBundle(dummyOutputBundle, src);
    expect(result).toBe('Asset content');
  });

  it('should return chunk code when type is chunk', () => {
    const src = '/assets/script.js';
    const result = getSourceFromBundle(dummyOutputBundle, src);
    expect(result).toBe('Chunk content');
  });
});
