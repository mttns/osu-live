"use client";
import { FilterMap } from "osu-live";
import { createContext, ReactNode, useMemo, useState } from "react";

export const FilterContext = createContext<{
  filters: FilterMap;
  setFilters: (filters: FilterMap) => void;
}>({
  filters: {},
  setFilters: () => {},
});

export const FilterContextProvider = function FilterContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filters, setFilters] = useState<FilterMap>({});

  const filterMemo = useMemo(() => {
    return { filters, setFilters };
  }, [filters]);

  return (
    <FilterContext.Provider value={filterMemo}>
      {children}
    </FilterContext.Provider>
  );
};
