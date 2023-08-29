import { Plugin } from 'vite';
import * as cheerio from 'cheerio';
import { calculateSRI } from './sri';
import { pluginName } from './grobals';
import { isThirdPartyAsset, fetchResource, getSourceFromBundle } from './resourceHelpers';

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

        if (context.bundle) {
          for (const element of elements) {
            const src = ($(element).attr('src') || $(element).attr('href')) as string;

            const source = isThirdPartyAsset(src)
              ? await fetchResource(src)
              : getSourceFromBundle(context.bundle, src);

            const sri = calculateSRI(source);
            $(element).attr('integrity', sri);
          }
        }

        return $.html();
      }
    }
  };
}
