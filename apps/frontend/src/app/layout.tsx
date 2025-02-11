"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../theme/theme";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}

