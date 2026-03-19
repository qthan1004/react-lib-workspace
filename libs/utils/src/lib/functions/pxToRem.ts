/**
 * Chuyển đổi giá trị px sang rem dựa trên htmlFontSize
 *
 * @param px - Giá trị pixel cần chuyển
 * @param htmlFontSize - Font size gốc của thẻ <html> (mặc định 14)
 * @returns Giá trị rem dạng string (VD: "1.143rem")
 *
 * @example
 * pxToRem(16)       // "1.143rem"  (16/14)
 * pxToRem(16, 16)   // "1rem"      (16/16)
 * pxToRem(0)        // "0rem"
 */
export const pxToRem = (px: number, htmlFontSize = 14): string => {
  return `${(px / htmlFontSize).toFixed(4).replace(/\.?0+$/, '')}rem`;
};
