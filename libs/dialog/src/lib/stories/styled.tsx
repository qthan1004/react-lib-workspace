import styled from '@emotion/styled';

export const StoryButton = styled.button(({ theme }) => ({
  padding: `${theme.spacing?.medium ?? '0.75rem'} ${theme.spacing?.large ?? '1rem'}`,
  borderRadius: theme.shape?.borderRadius ?? 6,
  border: 'none',
  background: theme.palette?.primary?.main ?? '#1976d2',
  color: theme.palette?.common?.white ?? 'white',
  fontSize: theme.typography?.body?.fontSize ?? 14,
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: theme.font?.fontFamily ?? 'inherit',
  '&:hover': { opacity: 0.9 },
}));

export const StoryButtonSecondary = styled.button(({ theme }) => ({
  padding: `${theme.spacing?.small ?? '0.5rem'} ${theme.spacing?.large ?? '1rem'}`,
  borderRadius: theme.shape?.borderRadius ?? 6,
  border: `1px solid ${theme.palette?.divider ?? '#ddd'}`,
  background: theme.palette?.common?.white ?? 'white',
  cursor: 'pointer',
  fontWeight: 500,
  fontFamily: theme.font?.fontFamily ?? 'inherit',
}));

export const StoryCard = styled.div(({ theme }) => ({
  background: theme.palette?.common?.white ?? 'white',
  borderRadius: theme.shape?.borderRadiusMedium ?? 12,
  padding: theme.spacing?.extraLarge ?? 32,
  minWidth: 400,
  boxShadow: theme.shadows?.[5] ?? '0 24px 48px rgba(0, 0, 0, 0.2)',
}));

export const StoryTitle = styled.h2(({ theme }) => ({
  margin: `0 0 ${theme.spacing?.large ?? '1rem'}`,
  fontSize: theme.typography?.h4?.fontSize ?? 20,
  fontFamily: theme.font?.fontFamily ?? 'inherit',
}));

export const StoryText = styled.p(({ theme }) => ({
  margin: `0 0 ${theme.spacing?.extraLarge ?? '1.5rem'}`,
  color: theme.palette?.disabled?.main ?? '#666',
  lineHeight: theme.typography?.body?.lineHeight ?? 1.5,
  fontFamily: theme.font?.fontFamily ?? 'inherit',
}));

export const StoryInput = styled.input(({ theme }) => ({
  padding: `${theme.spacing?.small ?? '0.5rem'} ${theme.spacing?.medium ?? '0.75rem'}`,
  border: `1px solid ${theme.palette?.divider ?? '#ddd'}`,
  borderRadius: theme.shape?.borderRadius ?? 6,
  fontSize: theme.typography?.body?.fontSize ?? 14,
  fontFamily: theme.font?.fontFamily ?? 'inherit',
  outline: 'none',
  '&:focus': {
    borderColor: theme.palette?.primary?.main ?? '#1976d2',
  },
}));

export const StoryTextarea = styled.textarea(({ theme }) => ({
  padding: `${theme.spacing?.small ?? '0.5rem'} ${theme.spacing?.medium ?? '0.75rem'}`,
  border: `1px solid ${theme.palette?.divider ?? '#ddd'}`,
  borderRadius: theme.shape?.borderRadius ?? 6,
  fontSize: theme.typography?.body?.fontSize ?? 14,
  fontFamily: theme.font?.fontFamily ?? 'inherit',
  resize: 'vertical' as const,
  outline: 'none',
  '&:focus': {
    borderColor: theme.palette?.primary?.main ?? '#1976d2',
  },
}));

export const StoryRow = styled.div(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing?.small ?? 8,
}));

export const StoryColumn = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing?.medium ?? 12,
}));

export const StoryActions = styled.div(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing?.small ?? 8,
  marginTop: theme.spacing?.large ?? 20,
  justifyContent: 'flex-end',
}));
