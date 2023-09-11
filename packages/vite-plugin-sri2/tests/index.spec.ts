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
      'sha384-G3G1LHjDKUmCa06SPcYjWrahgXtm5vtb0ocSsiFsxXrwLoW0JIjmPzES6Nc2z9xA'
    );
    expect($(stylesheetElements[0]).attr('integrity')).toBe(
      'sha384-dCLliT5+kyf/BWVXmLGWyw1gk+a6vCS78Vn7aRhdOT+2IHop/+xceezHjEm/4+PO'
    );
  });
});
