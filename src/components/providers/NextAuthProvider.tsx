"use client";

import { ReactNode } from "react";

import { SessionProvider } from "next-auth/react";

function NextAuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthProvider;
