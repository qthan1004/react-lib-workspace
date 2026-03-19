import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from '../Modal';
import type { ModalSize } from '../models';
import {
  StoryButton,
  StoryButtonSecondary,
  StoryCard,
  StoryTitle,
  StoryText,
  StoryInput,
  StoryTextarea,
  StoryRow,
  StoryColumn,
  StoryActions,
} from './styled';

// ─── Basic ───────────────────────────────────────────────

const BasicStory = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <StoryButton onClick={() => setOpen(true)}>Open Modal</StoryButton>

      <Modal open={open} onClose={() => setOpen(false)}>
        <StoryCard>
          <StoryTitle>Basic Modal</StoryTitle>
          <StoryText>
            Click backdrop hoặc nhấn ESC để đóng. Focus sẽ bị trap trong modal.
          </StoryText>
          <StoryButton onClick={() => setOpen(false)}>Close</StoryButton>
        </StoryCard>
      </Modal>
    </div>
  );
};

// ─── Sizes ───────────────────────────────────────────────

const SIZES: ModalSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'fullscreen'];

const SizesStory = () => {
  const [activeSize, setActiveSize] = useState<ModalSize | null>(null);

  return (
    <div>
      <StoryRow style={{ flexWrap: 'wrap', gap: 8 }}>
        {SIZES.map((size) => (
          <StoryButton key={size} onClick={() => setActiveSize(size)}>
            {size.toUpperCase()}
          </StoryButton>
        ))}
      </StoryRow>

      {SIZES.map((size) => (
        <Modal
          key={size}
          open={activeSize === size}
          onClose={() => setActiveSize(null)}
          size={size}
        >
          <StoryCard style={{ minWidth: 'unset', width: '100%', boxSizing: 'border-box' }}>
            <StoryTitle>Size: {size.toUpperCase()}</StoryTitle>
            <StoryText>
              Modal với preset size <strong>{size}</strong>. Click backdrop hoặc ESC để đóng.
            </StoryText>
            <StoryButton onClick={() => setActiveSize(null)}>Close</StoryButton>
          </StoryCard>
        </Modal>
      ))}
    </div>
  );
};

// ─── Custom Dimensions ───────────────────────────────────

const CustomDimensionsStory = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <StoryButton onClick={() => setOpen(true)}>
        Open Custom Size (700px × 400px)
      </StoryButton>

      <Modal open={open} onClose={() => setOpen(false)} width={700} height={400}>
        <StoryCard style={{ minWidth: 'unset', width: '100%', height: '100%', boxSizing: 'border-box' }}>
          <StoryTitle>Custom Dimensions</StoryTitle>
          <StoryText>
            Modal với width=700px và height=400px, override preset size.
          </StoryText>
          <StoryButton onClick={() => setOpen(false)}>Close</StoryButton>
        </StoryCard>
      </Modal>
    </div>
  );
};

// ─── Custom Content (Form) ───────────────────────────────

const FormStory = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <StoryButton onClick={() => setOpen(true)}>Open Form Modal</StoryButton>

      <Modal open={open} onClose={() => setOpen(false)} size="md">
        <StoryCard style={{ minWidth: 'unset', width: '100%', boxSizing: 'border-box' }}>
          <StoryTitle>Form trong Modal</StoryTitle>
          <StoryColumn>
            <StoryInput type="text" placeholder="Tên" />
            <StoryInput type="email" placeholder="Email" />
            <StoryTextarea placeholder="Ghi chú" rows={3} />
          </StoryColumn>
          <StoryActions>
            <StoryButtonSecondary onClick={() => setOpen(false)}>
              Hủy
            </StoryButtonSecondary>
            <StoryButton onClick={() => setOpen(false)}>Lưu</StoryButton>
          </StoryActions>
        </StoryCard>
      </Modal>
    </div>
  );
};

// ─── Nested Modals ───────────────────────────────────────

const NestedStory = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div>
      <StoryButton onClick={() => setOpen1(true)}>Open First Modal</StoryButton>

      <Modal open={open1} onClose={() => setOpen1(false)} size="lg">
        <StoryCard style={{ minWidth: 'unset', width: '100%', boxSizing: 'border-box' }}>
          <StoryTitle>Modal 1 (z-index: 1300)</StoryTitle>
          <StoryText>
            Đây là modal đầu tiên. Mở thêm modal thứ 2 để test stacking.
          </StoryText>
          <StoryRow>
            <StoryButton onClick={() => setOpen2(true)}>
              Open Second Modal
            </StoryButton>
            <StoryButton
              onClick={() => setOpen1(false)}
              style={{ background: '#666' }}
            >
              Close
            </StoryButton>
          </StoryRow>
        </StoryCard>
      </Modal>

      <Modal open={open2} onClose={() => setOpen2(false)} size="sm" zIndex={1400}>
        <StoryCard style={{ minWidth: 'unset', width: '100%', boxSizing: 'border-box' }}>
          <StoryTitle>Modal 2 (z-index: 1400)</StoryTitle>
          <StoryText>
            Modal nested — z-index cao hơn để hiện trên modal 1.
          </StoryText>
          <StoryButton onClick={() => setOpen2(false)}>Close</StoryButton>
        </StoryCard>
      </Modal>
    </div>
  );
};

// ─── Playground ──────────────────────────────────────────

const PlaygroundStory = (args: {
  size: ModalSize;
  width: string;
  height: string;
  disableBackdropClick: boolean;
  disableEscapeKey: boolean;
  keepMounted: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <StoryButton onClick={() => setOpen(true)}>
        Open Playground Modal
      </StoryButton>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size={args.size}
        width={args.width || undefined}
        height={args.height || undefined}
        disableBackdropClick={args.disableBackdropClick}
        disableEscapeKey={args.disableEscapeKey}
        keepMounted={args.keepMounted}
      >
        <StoryCard style={{ minWidth: 'unset', width: '100%', boxSizing: 'border-box' }}>
          <StoryTitle>Playground Modal</StoryTitle>
          <StoryText>
            Thay đổi Controls ở panel dưới để test các props.
          </StoryText>
          <StoryButton onClick={() => setOpen(false)}>Close</StoryButton>
        </StoryCard>
      </Modal>
    </div>
  );
};

// ─── Meta & Exports ──────────────────────────────────────

const meta: Meta = {
  title: 'Dialog/Modal',
};

export default meta;

export const Basic: StoryObj = {
  name: 'Basic',
  render: () => <BasicStory />,
};

export const Sizes: StoryObj = {
  name: 'Sizes',
  render: () => <SizesStory />,
};

export const CustomDimensions: StoryObj = {
  name: 'Custom Dimensions',
  render: () => <CustomDimensionsStory />,
};

export const CustomContent: StoryObj = {
  name: 'Form Content',
  render: () => <FormStory />,
};

export const Nested: StoryObj = {
  name: 'Nested Modals',
  render: () => <NestedStory />,
};

export const Playground: StoryObj<{
  size: ModalSize;
  width: string;
  height: string;
  disableBackdropClick: boolean;
  disableEscapeKey: boolean;
  keepMounted: boolean;
}> = {
  name: 'Playground',
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'fullscreen'],
      description: 'Preset size',
    },
    width: {
      control: 'text',
      description: 'Custom width (e.g. "700px", "50dvw")',
    },
    height: {
      control: 'text',
      description: 'Custom height (e.g. "400px", "60dvh")',
    },
    disableBackdropClick: {
      control: 'boolean',
      description: 'Disable close on backdrop click',
    },
    disableEscapeKey: {
      control: 'boolean',
      description: 'Disable close on ESC key',
    },
    keepMounted: {
      control: 'boolean',
      description: 'Keep modal DOM node when closed',
    },
  },
  args: {
    size: 'sm',
    width: '',
    height: '',
    disableBackdropClick: false,
    disableEscapeKey: false,
    keepMounted: false,
  },
  render: (args) => <PlaygroundStory {...args} />,
};
