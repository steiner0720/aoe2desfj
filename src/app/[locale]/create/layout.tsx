type LocaleLayoutProps = RootProvider & {
  params: Promise<{ locale: Locale }>;
};

async function LocaleLayout({ children }: LocaleLayoutProps) {
  return children;
}

export default LocaleLayout;
