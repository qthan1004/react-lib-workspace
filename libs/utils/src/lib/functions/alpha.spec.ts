import { describe, it, expect } from 'vitest';
import { alpha } from './alpha';

describe('alpha()', () => {
  it('converts a 6-digit hex with # to rgba', () => {
    expect(alpha('#1890ff', 0.2)).toBe('rgba(24, 144, 255, 0.2)');
  });

  it('converts a 6-digit hex without # to rgba', () => {
    expect(alpha('FF4D4F', 0.5)).toBe('rgba(255, 77, 79, 0.5)');
  });

  it('converts a 3-digit shorthand hex to rgba', () => {
    expect(alpha('#fff', 1)).toBe('rgba(255, 255, 255, 1)');
  });

  it('clamps opacity above 1 to 1', () => {
    expect(alpha('#000000', 1.5)).toBe('rgba(0, 0, 0, 1)');
  });

  it('clamps opacity below 0 to 0', () => {
    expect(alpha('#000000', -0.5)).toBe('rgba(0, 0, 0, 0)');
  });

  it('falls back gracefully for invalid hex', () => {
    expect(alpha('ZZZZZZ', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
  });
});
