/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeSchema, COLOR, THEME_DEFAULT, THEME_DARK, ThemeProvider } from '../index';

// ─── Shared Helpers ──────────────────────────────────────

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const theme = useTheme() as ThemeSchema;
  return (
    <section css={css`margin-bottom: 2rem;`}>
      <h2 css={css`
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        color: ${theme.palette?.common?.black};
        border-bottom: 1px solid ${theme.palette?.divider};
        padding-bottom: 0.5rem;
      `}>{title}</h2>
      {children}
    </section>
  );
};

// ─── Color Row ───────────────────────────────────────────

const ColorRow = ({ hue, entries }: { hue: string; entries: [string, string][] }) => (
  <div css={css`margin-bottom: 1rem;`}>
    <strong css={css`font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;`}>{hue}</strong>
    <div css={css`display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap;`}>
      {entries.map(([key, hex]) => (
        <div
          key={key}
          css={css`
            width: 64px; height: 64px;
            background: ${hex};
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            padding: 4px;
            gap: 1px;
            cursor: default;
            border: 1px solid rgba(0,0,0,0.06);
          `}
          title={`${key}: ${hex}`}
        >
          <span css={css`
            font-size: 1rem;
            font-weight: 700;
            color: white;
            text-shadow: 0 1px 3px rgba(0,0,0,0.8);
            line-height: 1;
          `}>{key.split('_')[1]}</span>
          <span css={css`
            font-size: 0.45rem;
            color: white;
            text-shadow: 0 1px 2px rgba(0,0,0,0.7);
            opacity: 0.9;
          `}>{hex}</span>
        </div>
      ))}
    </div>
  </div>
);

// ─── Theme Showcase ───────────────────────────────────────

const ThemeShowcase = ({ isDark = false }: { isDark?: boolean }) => {
  const theme = useTheme() as ThemeSchema;
  const hues = ['BLUE', 'RED', 'GREEN', 'ORANGE', 'YELLOW', 'GREY', 'PURPLE', 'BROWN', 'CYAN'];

  const surfaceColor = isDark ? (theme.palette?.background?.secondary ?? '#434343') : 'white';

  return (
    <div css={css`
      font-family: ${theme.font?.fontFamily};
      padding: 1.5rem;
      max-width: 960px;
      background: ${theme.palette?.background?.default};
      color: ${theme.palette?.common?.black};
      min-height: 100vh;
    `}>
      <h1 css={css`font-size: 1.5rem; margin-bottom: 1.5rem;`}>
        @thanhdq/theme {isDark ? '(Dark)' : ''}
      </h1>

      {/* Colors */}
      <Section title="🎨 Color Palette (15 shades per hue)">
        {hues.map((hue) => {
          const entries = Object.entries(COLOR)
            .filter(([key]) => key.startsWith(`${hue}_`))
            .sort(([a], [b]) => parseInt(a.split('_')[1]) - parseInt(b.split('_')[1]));
          return <ColorRow key={hue} hue={hue} entries={entries} />;
        })}
      </Section>

      {/* Semantic Palette */}
      <Section title="🎯 Semantic Palette">
        <div css={css`display: flex; gap: 0.5rem; flex-wrap: wrap;`}>
          {[
            { label: 'Primary', color: theme.palette?.primary?.main },
            { label: 'Primary Light', color: theme.palette?.primary?.light },
            { label: 'Primary Dark', color: theme.palette?.primary?.dark },
            { label: 'Error', color: theme.palette?.error?.dark },
            { label: 'Success', color: theme.palette?.success?.dark },
            { label: 'Warning', color: theme.palette?.warning?.dark },
            { label: 'Info', color: theme.palette?.info?.main },
            { label: 'Disabled', color: theme.palette?.disabled?.main },
          ].map(({ label, color }) => (
            <div key={label} css={css`
              display: inline-flex; align-items: center;
              padding: 6px 14px; border-radius: 9999px;
              background: ${color}; color: white;
              font-size: 0.8rem; font-weight: 500;
            `}>{label}</div>
          ))}
        </div>
      </Section>

      {/* Spacing */}
      <Section title="📏 Spacing">
        <div css={css`display: flex; gap: 12px; align-items: flex-end;`}>
          {theme.spacing && Object.entries(theme.spacing).map(([name, val]) => (
            <div key={name} css={css`text-align: center;`}>
              <div css={css`
                width: ${val}; height: ${val};
                background: ${theme.palette?.primary?.main};
                border-radius: 4px; margin-bottom: 4px;
              `} />
              <span css={css`font-size: 0.625rem;`}>{name}</span><br />
              <span css={css`font-size: 0.625rem; opacity: 0.5;`}>{String(val)}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Shapes */}
      <Section title="🔳 Border Radius">
        <div css={css`display: flex; gap: 12px; align-items: center;`}>
          {theme.shape && Object.entries(theme.shape).map(([name, val]) => (
            <div key={name} css={css`text-align: center;`}>
              <div css={css`
                width: 64px; height: 64px;
                background: ${theme.palette?.primary?.light};
                border-radius: ${val};
              `} />
              <span css={css`font-size: 0.625rem; display: block; margin-top: 4px;`}>{name}</span>
              <span css={css`font-size: 0.5rem; opacity: 0.5; display: block;`}>{String(val)}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Box Shadows — ALL tokens */}
      <Section title="🌗 Box Shadows (all tokens)">
        <div css={css`display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;`}>
          {theme.shadows?.map((shadow, i) =>
            shadow === 'none' ? null : (
              <div key={i} css={css`text-align: center;`}>
                <div css={css`
                  width: 88px; height: 88px;
                  background: ${surfaceColor};
                  border-radius: 8px;
                  box-shadow: ${shadow};
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 1rem;
                  font-weight: 700;
                  color: ${theme.palette?.common?.black};
                  margin-bottom: 8px;
                `}>
                  [{i}]
                </div>
                <code css={css`
                  font-size: 0.5rem;
                  display: block;
                  max-width: 88px;
                  word-break: break-all;
                  opacity: 0.5;
                  text-align: left;
                `} title={shadow}>
                  {shadow.slice(0, 32)}…
                </code>
              </div>
            )
          )}
        </div>
      </Section>

      {/* Z-Index */}
      <Section title="📐 Z-Index">
        <div css={css`display: flex; gap: 8px; flex-wrap: wrap;`}>
          {theme.zIndex && Object.entries(theme.zIndex).map(([name, val]) => (
            <span key={name} css={css`
              padding: 4px 10px;
              background: ${theme.palette?.background?.secondary};
              border-radius: 4px;
              font-size: 0.75rem;
            `}>{name}: {val}</span>
          ))}
        </div>
      </Section>
    </div>
  );
};

// ─── Custom Theme Preview ─────────────────────────────────

interface CustomThemeArgs {
  primaryColor: string;
  errorColor: string;
  successColor: string;
  fontFamily: string;
  borderRadius: string;
}

const CustomThemePreview = ({
  primaryColor,
  errorColor,
  successColor,
  fontFamily,
  borderRadius,
}: CustomThemeArgs) => {
  const base = useTheme() as ThemeSchema;

  const p = {
    ...base.palette,
    primary: { ...base.palette?.primary, main: primaryColor },
    error: { ...base.palette?.error, main: errorColor },
    success: { ...base.palette?.success, main: successColor },
  };

  return (
    <div css={css`font-family: ${fontFamily}; padding: 1.5rem; max-width: 560px;`}>
      <h1 css={css`font-size: 1.25rem; font-weight: 700; margin-bottom: 0.25rem;`}>
        🎨 Custom Theme Preview
      </h1>
      <p css={css`font-size: 0.8rem; opacity: 0.5; margin: 0 0 1.5rem;`}>
        Thay đổi Controls bên phải để xem preview thay đổi realtime ↓
      </p>

      {/* Buttons */}
      <Section title="Buttons">
        <div css={css`display: flex; gap: 10px; flex-wrap: wrap;`}>
          {[
            { label: 'Primary', bg: primaryColor, border: 'none', color: 'white' },
            { label: 'Outlined', bg: 'transparent', border: `1.5px solid ${primaryColor}`, color: primaryColor },
            { label: 'Error', bg: errorColor, border: 'none', color: 'white' },
            { label: 'Success', bg: successColor, border: 'none', color: 'white' },
          ].map(({ label, bg, border, color }) => (
            <button key={label} css={css`
              padding: 8px 20px;
              background: ${bg};
              color: ${color};
              border: ${border || 'none'};
              border-radius: ${borderRadius};
              font-family: ${fontFamily};
              font-size: 0.875rem;
              font-weight: 500;
              cursor: pointer;
            `}>{label}</button>
          ))}
        </div>
      </Section>

      {/* Input */}
      <Section title="Input Field">
        <input
          placeholder="Nhập văn bản..."
          css={css`
            width: 100%;
            padding: 8px 12px;
            border: 1.5px solid ${p?.divider};
            border-radius: ${borderRadius};
            font-family: ${fontFamily};
            font-size: 0.875rem;
            outline: none;
            box-sizing: border-box;
            &:focus {
              border-color: ${primaryColor};
              box-shadow: 0 0 0 3px ${p?.primary?.boxShadow};
            }
          `}
        />
      </Section>

      {/* Badges */}
      <Section title="Badges">
        <div css={css`display: flex; gap: 6px; flex-wrap: wrap;`}>
          {[
            { label: 'Primary', bg: primaryColor },
            { label: 'Error', bg: errorColor },
            { label: 'Success', bg: successColor },
            { label: 'Disabled', bg: p?.disabled?.main },
          ].map(({ label, bg }) => (
            <span key={label} css={css`
              padding: 2px 12px;
              border-radius: 9999px;
              background: ${bg};
              color: white;
              font-size: 0.8rem;
              font-weight: 500;
            `}>{label}</span>
          ))}
        </div>
      </Section>

      {/* Card */}
      <Section title="Card">
        <div css={css`
          padding: 16px;
          border-radius: ${borderRadius};
          background: ${p?.background?.default};
          border: 1px solid ${p?.divider};
          box-shadow: ${base.shadows?.[1]};
        `}>
          <h3 css={css`font-size: 1rem; font-weight: 600; margin: 0 0 8px; color: ${primaryColor};`}>
            Card title
          </h3>
          <p css={css`margin: 0 0 12px; font-size: 0.875rem; opacity: 0.7;`}>
            Preview card với custom theme. Font, màu và border radius đang được apply từ Controls.
          </p>
          <button css={css`
            padding: 6px 16px;
            background: ${primaryColor};
            color: white;
            border: none;
            border-radius: ${borderRadius};
            font-family: ${fontFamily};
            font-size: 0.8rem;
            cursor: pointer;
          `}>Confirm</button>
        </div>
      </Section>

      {/* Token summary */}
      <Section title="Current Token Values">
        <div css={css`display: flex; flex-direction: column; gap: 6px;`}>
          {[
            { label: 'primary.main', value: primaryColor, bg: primaryColor },
            { label: 'error.main', value: errorColor, bg: errorColor },
            { label: 'success.main', value: successColor, bg: successColor },
          ].map(({ label, value, bg }) => (
            <div key={label} css={css`display: flex; gap: 10px; align-items: center;`}>
              <div css={css`
                width: 24px; height: 24px;
                border-radius: 4px;
                background: ${bg};
                flex-shrink: 0;
                border: 1px solid ${p?.divider};
              `} />
              <code css={css`font-size: 0.8rem;`}>{label}</code>
              <span css={css`font-size: 0.8rem; opacity: 0.5;`}>→</span>
              <code css={css`font-size: 0.8rem; color: ${primaryColor};`}>{value}</code>
            </div>
          ))}
          <div css={css`display: flex; gap: 10px; align-items: center;`}>
            <div css={css`width: 24px; height: 24px;`} />
            <code css={css`font-size: 0.8rem;`}>shape.borderRadius</code>
            <span css={css`font-size: 0.8rem; opacity: 0.5;`}>→</span>
            <code css={css`font-size: 0.8rem; color: ${primaryColor};`}>{borderRadius}</code>
          </div>
          <div css={css`display: flex; gap: 10px; align-items: center;`}>
            <div css={css`width: 24px; height: 24px;`} />
            <code css={css`font-size: 0.8rem;`}>font.fontFamily</code>
            <span css={css`font-size: 0.8rem; opacity: 0.5;`}>→</span>
            <code css={css`font-size: 0.8rem; color: ${primaryColor};`}>{fontFamily}</code>
          </div>
        </div>
      </Section>
    </div>
  );
};

// ─── Meta ─────────────────────────────────────────────────

const meta: Meta = {
  title: 'Theme/Showcase',
};

export default meta;

// ─── Stories ──────────────────────────────────────────────

export const Default: StoryObj = {
  render: () => <ThemeShowcase />,
};

export const DarkTheme: StoryObj = {
  name: 'Dark Theme',
  render: () => (
    <ThemeProvider theme={THEME_DARK}>
      <ThemeShowcase isDark />
    </ThemeProvider>
  ),
};

export const CustomTheme: StoryObj<CustomThemeArgs> = {
  name: 'Custom Theme',
  argTypes: {
    primaryColor: {
      control: 'color',
      description: 'Màu primary chính',
    },
    errorColor: {
      control: 'color',
      description: 'Màu error',
    },
    successColor: {
      control: 'color',
      description: 'Màu success',
    },
    fontFamily: {
      control: 'select',
      options: [
        "'Roboto', sans-serif",
        "'Inter', sans-serif",
        "'Outfit', sans-serif",
        "'Fira Code', monospace",
        "Georgia, serif",
      ],
      description: 'Font chữ',
    },
    borderRadius: {
      control: 'select',
      options: ['0px', '2px', '4px', '6px', '8px', '12px', '16px', '9999px'],
      description: 'Border radius',
    },
  },
  args: {
    primaryColor: THEME_DEFAULT.palette?.primary?.main ?? '#1890ff',
    errorColor: THEME_DEFAULT.palette?.error?.dark ?? '#ff4d4f',
    successColor: THEME_DEFAULT.palette?.success?.dark ?? '#52c41a',
    fontFamily: "'Roboto', sans-serif",
    borderRadius: '6px',
  },
  render: (args) => <CustomThemePreview {...args} />,
};
