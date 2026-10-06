'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/shared/context/ThemeContext';
import { store } from '@/store/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </ThemeProvider>
  );
}
