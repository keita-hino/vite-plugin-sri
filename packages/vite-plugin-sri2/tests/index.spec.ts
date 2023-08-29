import { join } from 'path';
import { describe, it, expect } from 'vitest';
import { sri } from '../src';
import { build } from 'vite';
import type { OutputAsset, RollupOutput } from 'rollup';
import * as cheerio from 'cheerio';

describe('vite-plugin-sri2', () => {
  const rootPath = join(__dirname, 'fixtures');
  it('should add integrity attributes to script and stylesheet elements', async () => {
    const result = (await build({
      root: rootPath,
      plugins: [sri()]
    })) as RollupOutput;

    const entryPoint = result.output.find((o) => o.fileName === 'index.html') as OutputAsset;

    const $ = cheerio.load(entryPoint.source as string);
    const scriptElements = $('script[src]');
    const stylesheetElements = $('link[rel="stylesheet"][href]');

    expect($(scriptElements[0]).attr('integrity')).toBe(
      'sha256-FY+8RuCC5CIu80ehEhhOanOrLPt62B0y9WR9HNe1JKM='
    );
    expect($(stylesheetElements[0]).attr('integrity')).toBe(
      'sha256-hvtUv0ba70xxgFM+370bxTySIwOxWoJ2myk/yh8fiwA='
    );
  });
});
