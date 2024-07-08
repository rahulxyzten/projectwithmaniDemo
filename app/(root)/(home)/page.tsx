import React, { Suspense } from "react";
import Feed from "@/components/Feed";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col">
        <Feed />
      </main>
    </Suspense>
  );
};

export default page;
