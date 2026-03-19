import styled from '@emotion/styled';

export const StoryContainer = styled.div(({ theme }) => ({
  padding: theme.spacing?.extraLarge ?? '2rem',
  maxWidth: 800,
  fontFamily: theme.font?.fontFamily ?? 'inherit',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing?.large ?? '1rem',
}));

export const StorySectionTitle = styled.h1(({ theme }) => ({
  fontSize: theme.typography?.body?.fontSize ?? '0.875rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: theme.palette?.primary?.main ?? '#1976d2',
  margin: `0 0 ${theme.spacing?.small ?? '0.5rem'}`,
}));

export const StoryVariantCard = styled.div(({ theme }) => ({
  padding: theme.spacing?.large ?? '1rem',
  borderRadius: theme.shape?.borderRadiusMedium ?? 8,
  background: theme.palette?.background?.secondary ?? '#f5f5f5',
  borderLeft: `3px solid ${theme.palette?.primary?.main ?? '#1976d2'}`,
}));

export const StoryMeta = styled.div(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing?.large ?? '1rem',
  marginTop: theme.spacing?.small ?? '0.5rem',
  fontSize: '0.7rem',
  opacity: 0.5,
}));

export const StoryNoWrapBox = styled.div(({ theme }) => ({
  width: 300,
  border: `1px dashed ${theme.palette?.divider ?? '#ddd'}`,
  padding: theme.spacing?.small ?? 8,
  borderRadius: theme.shape?.borderRadiusTiny ?? 4,
}));
