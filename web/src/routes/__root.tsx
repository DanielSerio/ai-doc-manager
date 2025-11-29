import { Header, Layout, Main } from '@/components/layout';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const RootLayout = () => (
  <Layout>
    <Header />
    <Main>
      <Outlet />
    </Main>
    <TanStackRouterDevtools />
  </Layout>
);

export const Route = createRootRoute({ component: RootLayout });