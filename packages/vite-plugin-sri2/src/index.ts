import { Plugin } from 'vite';
import * as cheerio from 'cheerio';
import { calculateSRI } from './sri';
import { pluginName } from './grobals';

export function sri(): Plugin {
  return {
    name: pluginName,
    enforce: 'post',
    transformIndexHtml: {
      enforce: 'post',
      async transform(html, context) {
        const $ = cheerio.load(html);
        const scriptElements = $('script[src]');
        const stylesheetElements = $('link[rel="stylesheet"][href]');

        const elements = [...scriptElements, ...stylesheetElements];

        for (const element of elements) {
          const src = $(element).attr('src') || $(element).attr('href');
          if (!src) {
            return;
          }

          let source: string | Uint8Array = '';

          if (src.startsWith('http')) {
            try {
              const response = await fetch(src);
              if (response.ok) {
                source = await response.text();
              }
            } catch (error) {
              console.error(`[${pluginName}] Failed to fetch resource: ${src}`, error);
            }
          } else {
            const resourcePath = new URL(src, import.meta.url).pathname.substring(1);
            if (!context.bundle) {
              return;
            }

            const bundleResource = context.bundle[resourcePath];

            source = bundleResource.type === 'asset' ? bundleResource.source : bundleResource.code;
          }

          const sri = calculateSRI(source);
          $(element).attr('integrity', sri);
        }
        return $.html();
      }
    }
  };
}
