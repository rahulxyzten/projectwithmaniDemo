"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Category {
  _id: string;
  categoryName: string;
}

const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  const [active, setActive] = useState<string>(
    searchParams.get("category") || "all"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories name
        const categoriesResponse = await fetch("/api/category");
        const categoriesData = await categoriesResponse.json();
        const categoryNamesList = categoriesData.map(
          (category: Category) => category.categoryName
        );
        setCategoryNames(categoryNamesList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const primaryCategories = ["all", ...categoryNames.slice(0, 3)];
  const moreCategories = categoryNames.slice(3);

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
    <ul className="text-white-800 body-text no-scrollbar flex w-full max-w-full sm:justify-center overflow-auto pt-12 sm:max-w-2xl">
      {primaryCategories.map((link) => (
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
      <select
        onChange={(e) => handleFilter(e.target.value)}
        value={active}
        className={`${
          primaryCategories.includes(active) ? "" : "gradient_blue-purple"
        } custom-select whitespace-nowrap bg-black-100 focus:bg-black-100 focus:outline-none appearance-none rounded-lg px-2 capitalize text-center`}
      >
        <option value="">More</option>
        {moreCategories.map((link) => (
          <option value={link}>{link}</option>
        ))}
      </select>
    </ul>
  );
};

export default Filters;
