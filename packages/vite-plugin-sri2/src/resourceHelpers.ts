import type { OutputBundle } from 'rollup';
import { pluginName } from './grobals';

export const isThirdPartyAsset = (src: string) => src.startsWith('http');

export const fetchResource = async (src: string): Promise<string> => {
  try {
    const response = await fetch(src);
    if (response.ok) {
      return await response.text();
    }
  } catch (error) {
    console.error(`[${pluginName}] Failed to fetch resource: ${src}`, error);
  }
  return '';
};

export const getSourceFromBundle = (outputBundle: OutputBundle, src: string) => {
  const resourcePath = new URL(src, import.meta.url).pathname.substring(1);
  const bundleResource = outputBundle[resourcePath];
  return bundleResource.type === 'asset' ? bundleResource.source : bundleResource.code;
};
