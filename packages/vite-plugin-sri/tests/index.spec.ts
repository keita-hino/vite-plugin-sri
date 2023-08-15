import { describe, it, expect } from 'vitest';
import { sri } from '../src';

describe('vite-plugin-sri', () => {
	it('should be named', function () {
		expect(sri().name).toBe('vite-plugin-sri');
	});
});
