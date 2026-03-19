/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { alpha } from '@thanhdq/utils';
import { ThemeSchema, COLOR } from '../index';

// ─── Demo Component ──────────────────────────────────────

interface AlphaDemoProps {
  /** Base hex color */
  hex: string;
  /** Opacity (0 → 1) */
  opacity: number;
}

const AlphaDemo = ({ hex, opacity }: AlphaDemoProps) => {
  const theme = useTheme() as ThemeSchema;
  const result = alpha(hex, opacity);

  return (
    <div css={css`
      font-family: ${theme.font?.fontFamily};
      padding: 1.5rem;
      max-width: 640px;
    `}>
      <h1 css={css`font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem;`}>
        alpha() — Hex → RGBA
      </h1>

      {/* ── Result Card ── */}
      <div css={css`
        border-radius: ${theme.shape?.borderRadiusMedium};
        border: 1px solid ${theme.palette?.divider};
        overflow: hidden;
        margin-bottom: 1.5rem;
      `}>
        {/* Color preview with checkerboard to show transparency */}
        <div css={css`
          height: 120px;
          background-image:
            linear-gradient(45deg, #ccc 25%, transparent 25%),
            linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(-45deg, transparent 75%, #ccc 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
          position: relative;
        `}>
          <div css={css`
            position: absolute; inset: 0;
            background: ${result};
          `} />
        </div>

        {/* Result value */}
        <div css={css`
          padding: 1rem;
          background: ${theme.palette?.background?.secondary};
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        `}>
          <code css={css`
            font-family: 'Fira Code', monospace;
            font-size: 0.875rem;
            color: ${theme.palette?.primary?.dark};
          `}>
            alpha('{hex}', {opacity}) → <strong>{result}</strong>
          </code>
          <div css={css`
            width: 32px; height: 32px;
            border-radius: 50%;
            background: ${hex};
            border: 2px solid ${theme.palette?.divider};
            flex-shrink: 0;
          `} title={`Solid: ${hex}`} />
        </div>
      </div>

      {/* ── Opacity scale ── */}
      <h2 css={css`font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem; opacity: 0.6;`}>
        Opacity scale với màu này
      </h2>
      <div css={css`display: flex; gap: 8px; flex-wrap: wrap;`}>
        {[0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((op) => (
          <div key={op} css={css`text-align: center;`}>
            <div css={css`
              width: 64px; height: 64px;
              border-radius: ${theme.shape?.borderRadius};
              background: ${alpha(hex, op)};
              border: 1px solid ${theme.palette?.divider};
              margin-bottom: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
            `} />
            <span css={css`font-size: 2rem; font-weight: 600; line-height: 1;`}>{op}</span>
          </div>
        ))}
      </div>

      {/* ── Use cases ── */}
      <h2 css={css`font-size: 0.875rem; font-weight: 600; margin: 1.25rem 0 0.75rem; opacity: 0.6;`}>
        Ví dụ thực tế
      </h2>
      <div css={css`display: flex; flex-direction: column; gap: 10px;`}>
        <div css={css`
          padding: 12px 16px;
          border-radius: ${theme.shape?.borderRadius};
          background: ${alpha(hex, 0.1)};
          border: 1px solid ${alpha(hex, 0.3)};
          font-size: 0.875rem;
        `}>
          🎨 Background tint — <code>alpha(hex, 0.1)</code> với border <code>alpha(hex, 0.3)</code>
        </div>

        <div css={css`
          padding: 12px 16px;
          border-radius: ${theme.shape?.borderRadius};
          box-shadow: 0 0 0 3px ${alpha(hex, 0.35)};
          border: 1px solid ${hex};
          font-size: 0.875rem;
        `}>
          🔵 Focus ring — <code>box-shadow: 0 0 0 3px alpha(hex, 0.35)</code>
        </div>

        <div css={css`
          padding: 12px 16px;
          border-radius: ${theme.shape?.borderRadius};
          font-size: 0.875rem;
          background: ${alpha('#000000', 0.45)};
          color: white;
        `}>
          🌫️ Overlay — <code>alpha('#000000', 0.45)</code>
        </div>
      </div>
    </div>
  );
};

// ─── Interactive Picker ───────────────────────────────────

const ColorPickerDemo = () => {
  const theme = useTheme() as ThemeSchema;
  const [pickedHex, setPickedHex] = useState('#1890ff');
  const [pickedOpacity, setPickedOpacity] = useState(0.2);

  const result = alpha(pickedHex, pickedOpacity);

  return (
    <div css={css`
      font-family: ${theme.font?.fontFamily};
      padding: 1.5rem;
      max-width: 480px;
    `}>
      <h1 css={css`font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem;`}>
        🎛️ Tự chọn màu & opacity
      </h1>

      <div css={css`display: flex; gap: 1rem; margin-bottom: 1rem; align-items: center;`}>
        <label css={css`font-size: 0.875rem; display: flex; flex-direction: column; gap: 4px;`}>
          Hex color
          <input
            type="color"
            value={pickedHex}
            onChange={(e) => setPickedHex(e.target.value)}
            css={css`width: 56px; height: 36px; border-radius: 6px; border: none; cursor: pointer;`}
          />
        </label>

        <label css={css`font-size: 0.875rem; flex: 1; display: flex; flex-direction: column; gap: 4px;`}>
          Opacity: <strong>{pickedOpacity}</strong>
          <input
            type="range"
            min={0} max={1} step={0.01}
            value={pickedOpacity}
            onChange={(e) => setPickedOpacity(parseFloat(e.target.value))}
            css={css`width: 100%;`}
          />
        </label>
      </div>

      {/* Preview */}
      <div css={css`
        height: 80px;
        border-radius: ${theme.shape?.borderRadiusMedium};
        border: 1px solid ${theme.palette?.divider};
        background-image:
          linear-gradient(45deg, #ccc 25%, transparent 25%),
          linear-gradient(-45deg, #ccc 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #ccc 75%),
          linear-gradient(-45deg, transparent 75%, #ccc 75%);
        background-size: 16px 16px;
        background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
        position: relative;
        overflow: hidden;
        margin-bottom: 0.75rem;
      `}>
        <div css={css`position: absolute; inset: 0; background: ${result};`} />
      </div>

      <code css={css`
        font-size: 0.875rem;
        font-family: 'Fira Code', monospace;
        color: ${theme.palette?.primary?.dark};
        display: block;
        padding: 10px 14px;
        background: ${theme.palette?.background?.secondary};
        border-radius: ${theme.shape?.borderRadius};
      `}>
        alpha('{pickedHex}', {pickedOpacity}) = <strong>{result}</strong>
      </code>

      {/* Palette tokens */}
      <h2 css={css`font-size: 0.875rem; font-weight: 600; margin: 1.25rem 0 0.75rem; opacity: 0.6;`}>
        Thử nhanh với color tokens
      </h2>
      <div css={css`display: flex; gap: 8px; flex-wrap: wrap;`}>
        {Object.entries(COLOR)
          .filter(([k]) => k.endsWith('_7') || k.endsWith('_8'))
          .map(([key, hex]) => (
            <div
              key={key}
              onClick={() => setPickedHex(hex)}
              css={css`
                width: 44px; height: 44px;
                border-radius: 50%;
                background: ${hex};
                cursor: pointer;
                border: 3px solid ${pickedHex === hex ? theme.palette?.common?.black : 'transparent'};
                transition: border 150ms;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.5rem;
                color: white;
                text-shadow: 0 1px 2px rgba(0,0,0,0.5);
              `}
              title={`${key}: ${hex}`}
            >
              {key.split('_')[0].slice(0, 2)}
            </div>
          ))}
      </div>
    </div>
  );
};

// ─── Story Meta ──────────────────────────────────────────

const meta: Meta<AlphaDemoProps> = {
  title: 'Utils/alpha',
  component: AlphaDemo,
  argTypes: {
    hex: {
      control: 'color',
      description: 'Màu hex (3 hoặc 6 ký tự, có hoặc không có #)',
    },
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Độ trong suốt từ 0 (trong suốt) đến 1 (đục hoàn toàn)',
    },
  },
  args: {
    hex: '#1890ff',
    opacity: 0.2,
  },
};

export default meta;
type Story = StoryObj<AlphaDemoProps>;

/** Story mặc định với Storybook Controls để tuỳ chỉnh màu & opacity */
export const Default: Story = {};

/** Ví dụ với màu đỏ — error focus ring */
export const ErrorAlpha: Story = {
  args: { hex: '#ff4d4f', opacity: 0.2 },
};

/** Ví dụ với overlay đen */
export const DarkOverlay: Story = {
  args: { hex: '#000000', opacity: 0.45 },
};

/** Picker tương tác — tự chọn màu và kéo opacity */
export const InteractivePicker: Story = {
  render: () => <ColorPickerDemo />,
};
