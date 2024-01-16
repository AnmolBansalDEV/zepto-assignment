"use client";

import { Chip, Input, Suggestions, SuggestionsData } from "@/components";
import { useFilter } from "@/hooks/useFilter";
import { useEffect, useState } from "react";

export default function Home() {
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [data, setData] = useState<SuggestionsData[]>([]);
  const [chips, setChips] = useState<SuggestionsData[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://reqres.in/api/users");
      const { data } = await response.json();
      const transformedData = data.map((obj: any) => ({
        id: obj.id,
        title: `${obj.first_name} ${obj.last_name}`,
        description: obj.email,
        imageUrl: obj.avatar,
      }));
      setData(transformedData);
    })();
  }, []);
  const [searchedData, setSearchValue] = useFilter(data, (data) => data.title);
  if (!data) {
    return <div>getting user data...</div>;
  }
  const handleSelect = (id: string) => {
    setChips((currentChips) => [
      ...currentChips,
      data.find((x) => x.id === id),
    ] as SuggestionsData[]);
    setData(prev => prev.filter(x => x.id !== id))
  };
  return (
    <main className="flex flex-col gap-10 items-center justify-between p-24">
      <h1 className="text-2xl">Pick Users</h1>

      <div className="w-full flex gap-2 pb-2 items-center flex-wrap border-b-2 border-blue-400 ">
        {chips.length !== 0 &&
          chips.map((chip) => (
            <Chip key={chip.id} title={chip.title} imageUrl={chip.imageUrl} />
          ))}
        <div className="relative w-96">
          <Input
            onFocus={() => setSuggestionsVisible(true)}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {suggestionsVisible && (
            <Suggestions
              data={searchedData as SuggestionsData[]}
              onItemSelect={handleSelect}
            />
          )}
        </div>
      </div>
    </main>
  );
}
