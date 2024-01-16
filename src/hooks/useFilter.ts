import { useState } from "react";

type Data = Record<string, any>;

export function useFilter(dataList: Data[], callback: (data: Data) => string) {
  const [query, setQuery] = useState<string>("");

  const filteredData = dataList.filter((data) => {
    if (!callback(data)) {
      return;
    }
    return callback(data).toLowerCase().includes(query);
  });
  return [filteredData, setQuery] as const;
}