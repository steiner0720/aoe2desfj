"use client";

import LayoutHeader from "./LayoutHeader";

function PageLayout({ children }: RootProvider) {
  return (
    <div className="h-screen w-full pt-16">
      <LayoutHeader />
      {children}
    </div>
  );
}

export default PageLayout;
