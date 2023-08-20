import { Plugin } from 'vite';
import * as cheerio from 'cheerio';
import { calculateSRI } from './sri';

export function sri(): Plugin {
  return {
    name: 'vite-plugin-sri2',
    enforce: 'post',
    transformIndexHtml: {
      enforce: 'post',
      transform(html, context) {
        const $ = cheerio.load(html);
        const scriptElements = $('script[src]');
        const stylesheetElements = $('link[rel="stylesheet"][href]');

        const elements = [...scriptElements, ...stylesheetElements];

        elements.forEach((element) => {
          const src = $(element).attr('src') || $(element).attr('href');
          if (src) {
            // FIXME: Loading of external resources
            const resourcePath = new URL(src, import.meta.url).pathname.substring(1);
            if (!context.bundle) {
              return;
            }

            const bundleResource = context.bundle[resourcePath];

            const source =
              bundleResource.type === 'asset' ? bundleResource.source : bundleResource.code;

            const sri = calculateSRI(source);
            $(element).attr('integrity', sri);
          }
        });
        return $.html();
      }
    }
  };
}
