"use server";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import MongoDBProvider from "@/components/providers/MongoDBProvider";
import NextAuthProvider from "@/components/providers/NextAuthProvider";

type ServerProviderProps = RootProvider & { locale: Locale };

async function ServerProvider({ children, locale }: ServerProviderProps) {
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <MongoDBProvider>
      <NextAuthProvider>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </NextAuthProvider>
    </MongoDBProvider>
  );
}

export default ServerProvider;
