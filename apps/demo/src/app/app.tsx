import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import type { ThemeSchema } from '@thanhdq/theme';
import { Route, Routes, Link } from 'react-router-dom';

// ─── Styled Components ───────────────────────────────────

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.font?.fontFamily};
  color: ${({ theme }) => theme.palette?.common?.black};
`;

const Header = styled.header`
  padding: ${({ theme }) => theme.spacing?.large} ${({ theme }) => theme.spacing?.extraLarge};
  background: ${({ theme }) => theme.palette?.common?.white};
  border-bottom: 1px solid ${({ theme }) => theme.palette?.divider};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${({ theme }) => theme.shadows?.[1]};
`;

const Logo = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette?.primary?.main};
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing?.large};
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.palette?.common?.black};
  font-weight: 500;
  transition: color 150ms ease-in-out;
  text-decoration: none;
  opacity: 0.7;

  &:hover {
    color: ${({ theme }) => theme.palette?.primary?.main};
    opacity: 1;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing?.extraLarge};
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const Card = styled.div`
  padding: ${({ theme }) => theme.spacing?.extraLarge};
  background: ${({ theme }) => theme.palette?.common?.white};
  border-radius: ${({ theme }) => theme.shape?.borderRadiusMedium};
  box-shadow: ${({ theme }) => theme.shadows?.[1]};
  margin-bottom: ${({ theme }) => theme.spacing?.large};
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 ${({ theme }) => theme.spacing?.medium} 0;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.palette?.common?.black};
  opacity: 0.7;
  line-height: 1.75;
  margin: 0;
`;

const CodeBlock = styled.div`
  margin-top: ${({ theme }) => theme.spacing?.medium};
  padding: ${({ theme }) => theme.spacing?.medium};
  background: ${({ theme }) => theme.palette?.background?.secondary};
  border-radius: ${({ theme }) => theme.shape?.borderRadiusTiny};
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing?.small};
  margin-top: ${({ theme }) => theme.spacing?.medium};
`;

const ColorSwatch = styled.div<{ bg: string }>`
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.shape?.borderRadiusTiny};
  background: ${({ bg }) => bg};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 4px;
  font-size: 0.5rem;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
`;

const Badge = styled.span<{ color: string }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${({ color }) => color};
  color: white;
  margin-right: 4px;
`;

// ─── Pages ───────────────────────────────────────────────

function HomePage() {
  const theme = useTheme() as ThemeSchema;
  const { colors } = theme;

  return (
    <div>
      <Card>
        <CardTitle>
          <span role="img" aria-label="palette">🎨</span> Theme Demo
        </CardTitle>
        <Text>
          <strong>@thanhdq/theme</strong> — Emotion styled components sử dụng shared design tokens.
        </Text>
      </Card>

      <Card>
        <CardTitle>
          <span role="img" aria-label="colors">🎯</span> Palette
        </CardTitle>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge color={theme.palette?.primary?.main || ''}>Primary</Badge>
          <Badge color={theme.palette?.error?.dark || ''}>Error</Badge>
          <Badge color={theme.palette?.success?.dark || ''}>Success</Badge>
          <Badge color={theme.palette?.warning?.dark || ''}>Warning</Badge>
          <Badge color={theme.palette?.info?.main || ''}>Info</Badge>
        </div>
      </Card>

      <Card>
        <CardTitle>
          <span role="img" aria-label="blue">💙</span> Blue Scale (15 shades)
        </CardTitle>
        <ColorGrid>
          {colors && Object.entries(colors)
            .filter(([key]) => key.startsWith('BLUE_'))
            .map(([key, hex]) => (
              <ColorSwatch key={key} bg={hex as string}>{key.replace('BLUE_', '')}</ColorSwatch>
            ))
          }
        </ColorGrid>
      </Card>

      <Card>
        <CardTitle>
          <span role="img" aria-label="grey">⬛</span> Grey Scale
        </CardTitle>
        <ColorGrid>
          {colors && Object.entries(colors)
            .filter(([key]) => key.startsWith('GREY_'))
            .map(([key, hex]) => (
              <ColorSwatch key={key} bg={hex as string}>{key.replace('GREY_', '')}</ColorSwatch>
            ))
          }
        </ColorGrid>
      </Card>

      <Card>
        <CardTitle>
          <span role="img" aria-label="package">📦</span> Structure
        </CardTitle>
        <CodeBlock>
          <div>📁 apps/demo — this app</div>
          <div>📁 libs/theme — ThemeProvider, tokens, models</div>
          <div>📁 libs/utils — pxToRem, hooks</div>
        </CodeBlock>
      </Card>
    </div>
  );
}

function Page2() {
  return (
    <Card>
      <CardTitle>
        <span role="img" aria-label="page">📄</span> Page 2
      </CardTitle>
      <Text>
        Routing works! <Link to="/">← Về trang chủ</Link>
      </Text>
    </Card>
  );
}

// ─── App ─────────────────────────────────────────────────

export function App() {
  return (
    <AppContainer>
      <Header>
        <Logo>@thanhdq/theme</Logo>
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/page-2">Page 2</NavLink>
        </Nav>
      </Header>

      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/page-2" element={<Page2 />} />
        </Routes>
      </Main>
    </AppContainer>
  );
}

export default App;
