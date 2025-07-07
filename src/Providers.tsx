import { Suspense, FC, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ConfigProvider } from '@providers/configProvider';
import { ThemeProvider } from '@providers/themeProvider';

type ProvidersProps = {
  children: ReactNode;
};

export const Providers: FC<ProvidersProps> = ({ children }: ProvidersProps) => (
  <ConfigProvider>
    <BrowserRouter>
      <ThemeProvider>
        <Suspense>{children}</Suspense>
      </ThemeProvider>
    </BrowserRouter>
  </ConfigProvider>
);
