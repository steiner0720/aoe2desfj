"use client";

import { Button } from "@/components/ui/button";

function Home() {
  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-center gap-8">
        <div>Home page</div>

        <Button>Test</Button>
      </div>
    </div>
  );
}

export default Home;
