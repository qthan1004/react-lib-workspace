import { describe, it, expect } from 'vitest';
import { pxToRem } from './pxToRem';

describe('pxToRem', () => {
  it('should convert px to rem with default htmlFontSize (14)', () => {
    expect(pxToRem(14)).toBe('1rem');
    expect(pxToRem(28)).toBe('2rem');
    expect(pxToRem(7)).toBe('0.5rem');
  });

  it('should convert px to rem with custom htmlFontSize', () => {
    expect(pxToRem(16, 16)).toBe('1rem');
    expect(pxToRem(32, 16)).toBe('2rem');
    expect(pxToRem(8, 16)).toBe('0.5rem');
  });

  it('should handle 0', () => {
    expect(pxToRem(0)).toBe('0rem');
    expect(pxToRem(0, 16)).toBe('0rem');
  });

  it('should handle fractional results', () => {
    expect(pxToRem(16, 14)).toBe('1.1429rem');
    expect(pxToRem(10, 14)).toBe('0.7143rem');
  });

  it('should trim unnecessary trailing zeros', () => {
    expect(pxToRem(14, 14)).toBe('1rem');
    expect(pxToRem(7, 14)).toBe('0.5rem');
  });

  it('should handle large values', () => {
    expect(pxToRem(1000, 14)).toBe('71.4286rem');
  });

  it('should always return a string ending with rem', () => {
    const result = pxToRem(12);
    expect(result).toMatch(/rem$/);
  });
});
