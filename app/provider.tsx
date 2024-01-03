"use client";
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { theme } from "./theme";

interface Props {
  children: ReactNode;
}

const Providers = (props: Props) => {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
