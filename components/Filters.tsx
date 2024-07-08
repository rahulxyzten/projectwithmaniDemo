"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const links = [
  "all",
  "arduino",
  "electronics",
  "esp8266",
  "more",
  // "raspberrypi",
  // "multirotor",
  // "esp32",
];

const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState<string>(
    searchParams.get("category") || "all"
  );

  const handleFilter = (link: string) => {
    const params = new URLSearchParams(searchParams);

    if (active === link) {
      setActive("all");
      params.delete("category");
    } else {
      setActive(link);
      params.set("category", link.toLowerCase());
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const category = searchParams.get("category") || "all";
    setActive(category);
  }, [searchParams]);

  return (
    <ul className="text-white-800 body-text no-scrollbar flex w-full max-w-full gap-2 overflow-auto pt-12 sm:max-w-2xl">
      {links.map((link) => (
        <button
          key={link}
          onClick={() => handleFilter(link)}
          className={`${
            active === link ? "gradient_blue-purple" : ""
          } whitespace-nowrap rounded-lg px-8 py-2.5 capitalize`}
        >
          {link}
        </button>
      ))}
    </ul>
  );
};

export default Filters;
