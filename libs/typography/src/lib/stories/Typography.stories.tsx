import { useTheme } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography, type TypographyVariant } from '../../index';
import type { ThemeSchema } from '@thanhdq/theme';
import {
  StoryContainer,
  StorySectionTitle,
  StoryVariantCard,
  StoryMeta,
  StoryNoWrapBox,
} from './styled';

// ─── Helpers ─────────────────────────────────────────────

const VARIANTS: TypographyVariant[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'body'];

const SAMPLE_TEXT: Record<TypographyVariant, string> = {
  h1: 'Heading 1 — Page Title',
  h2: 'Heading 2 — Section Title',
  h3: 'Heading 3 — Subsection',
  h4: 'Heading 4 — Card Title',
  h5: 'Heading 5 — Label',
  body: 'Body — Đây là đoạn văn bản mẫu. Typography component hỗ trợ WCAG AA với semantic HTML tags, line-height tối thiểu 1.5, và font size sử dụng đơn vị rem.',
};

// ─── All Variants ────────────────────────────────────────

const AllVariantsStory = () => {
  const theme = useTheme() as ThemeSchema;

  return (
    <StoryContainer>
      <StorySectionTitle>All Typography Variants</StorySectionTitle>

      {VARIANTS.map((variant) => {
        const typo = theme.typography?.[variant];
        return (
          <StoryVariantCard key={variant}>
            <Typography variant={variant}>
              {SAMPLE_TEXT[variant]}
            </Typography>
            <StoryMeta>
              <span>variant: <strong>{variant}</strong></span>
              <span>tag: <strong>&lt;{variant === 'body' ? 'p' : variant}&gt;</strong></span>
              {typo && (
                <>
                  <span>size: {typo.fontSize}px</span>
                  <span>weight: {typo.fontWeight}</span>
                  <span>line-height: {typo.lineHeight}</span>
                </>
              )}
            </StoryMeta>
          </StoryVariantCard>
        );
      })}
    </StoryContainer>
  );
};

// ─── With Colors ─────────────────────────────────────────

const WithColorsStory = () => {
  const colors = ['inherit', 'primary', 'error', 'success', 'warning', 'info'];

  return (
    <StoryContainer style={{ gap: '0.75rem' }}>
      <StorySectionTitle>Color Variants</StorySectionTitle>

      {colors.map((color) => (
        <Typography key={color} variant="h4" color={color}>
          color=&quot;{color}&quot; — Đây là văn bản mẫu
        </Typography>
      ))}
    </StoryContainer>
  );
};

// ─── Features ────────────────────────────────────────────

const FeaturesStory = () => (
  <StoryContainer style={{ maxWidth: 600, gap: '1.5rem' }}>
    <div>
      <Typography variant="h5" color="primary" gutterBottom>
        gutterBottom
      </Typography>
      <Typography variant="body">
        Khi bật gutterBottom, sẽ có margin-bottom: 0.35em giữa các đoạn.
      </Typography>
    </div>

    <div>
      <Typography variant="h5" color="primary" gutterBottom>
        noWrap
      </Typography>
      <StoryNoWrapBox>
        <Typography variant="body" noWrap>
          Đây là đoạn văn bản rất dài sẽ bị cắt bằng ellipsis vì noWrap được bật và container chỉ rộng 300px.
        </Typography>
      </StoryNoWrapBox>
    </div>

    <div>
      <Typography variant="h5" color="primary" gutterBottom>
        component override (WCAG aria-level)
      </Typography>
      <Typography variant="h1" component="span">
        variant=&quot;h1&quot; component=&quot;span&quot; → renders &lt;span role=&quot;heading&quot; aria-level=&quot;1&quot;&gt;
      </Typography>
    </div>

    <div>
      <Typography variant="h5" color="primary" gutterBottom>
        weight
      </Typography>
      <Typography variant="body" weight={700}>
        weight={'{700}'} — Bold
      </Typography>
      <Typography variant="body" weight={400}>
        weight={'{400}'} — Regular
      </Typography>
      <Typography variant="h3" weight={300}>
        variant=&quot;h3&quot; weight={'{300}'} — Light heading
      </Typography>
    </div>
  </StoryContainer>
);

// ─── Meta & Exports ──────────────────────────────────────

const meta: Meta = {
  title: 'Typography/Showcase',
};

export default meta;

export const AllVariants: StoryObj = {
  name: 'All Variants',
  render: () => <AllVariantsStory />,
};

export const WithColors: StoryObj = {
  name: 'With Colors',
  render: () => <WithColorsStory />,
};

export const Features: StoryObj = {
  name: 'Features',
  render: () => <FeaturesStory />,
};

export const Playground: StoryObj<{
  variant: TypographyVariant;
  color: string;
  align: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  weight: number;
  gutterBottom: boolean;
  noWrap: boolean;
  text: string;
}> = {
  name: 'Playground',
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
      description: 'Typography variant',
    },
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'error', 'success', 'warning', 'info'],
      description: 'Text color',
    },
    align: {
      control: 'select',
      options: ['inherit', 'left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    weight: {
      control: { type: 'number', min: 100, max: 900, step: 100 },
      description: 'Font weight override',
    },
    gutterBottom: {
      control: 'boolean',
      description: 'Add margin-bottom',
    },
    noWrap: {
      control: 'boolean',
      description: 'Truncate with ellipsis',
    },
    text: {
      control: 'text',
      description: 'Display text',
    },
  },
  args: {
    variant: 'h1',
    color: 'inherit',
    align: 'inherit',
    weight: undefined,
    gutterBottom: false,
    noWrap: false,
    text: 'Typography — Thay đổi Controls để xem thay đổi realtime',
  },
  render: ({ text, ...args }) => (
    <StoryContainer>
      <Typography {...args}>{text}</Typography>
    </StoryContainer>
  ),
};
