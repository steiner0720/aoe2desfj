import type { Metadata } from "next";

import PageLayout from "@/components/layout/PageLayout";
import ClientProvider from "@/components/providers/ClientProvider";
import ServerProvider from "@/components/providers/ServerProvider";

type LocaleLayoutProps = RootProvider & {
  params: Promise<{ locale: Locale }>;
};

export const metadata: Metadata = {
  title: "AOE2 DE - Sih Fei Jhai",
  description: "Custom maps for AOE2 DE ",
};

async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const resolvedParams = await params;

  return (
    <html lang={resolvedParams.locale}>
      <body>
        <ServerProvider locale={resolvedParams.locale}>
          <ClientProvider>
            <PageLayout>{children}</PageLayout>
          </ClientProvider>
        </ServerProvider>
      </body>
    </html>
  );
}

export default LocaleLayout;
