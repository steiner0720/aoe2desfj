import "./globals.css";

async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

export default RootLayout;
