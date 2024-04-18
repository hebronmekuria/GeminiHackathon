import React from "react";
import { EvervaultCard, Icon } from "./ui/evervault-card";
import { HStack } from "../../../lib/mui";

export function EvervaultCardDemo() {
  return (
    <div className=" dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
      

      <EvervaultCard text="Dashboard" />
        <HStack spacing={'auto'}>
      <button className="px-4 py-2 rounded-xl border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200">
  Outline
</button>
<button className="px-4 py-2 rounded-xl border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200">
  Outline
</button>
</HStack>
    </div>
  );
}
