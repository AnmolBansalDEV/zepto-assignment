"use client";

import { Chip, Input, Suggestions, SuggestionsData } from "@/components";
import { useFilter } from "@/hooks/useFilter";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [data, setData] = useState<SuggestionsData[]>([]);
  const [chips, setChips] = useState<SuggestionsData[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const backspaceCountRef = useRef(0);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://reqres.in/api/users");
      const { data } = await response.json();
      const transformedData = data.map((obj: any) => ({
        id: obj.id,
        title: `${obj.first_name} ${obj.last_name}`,
        description: obj.email,
        imageUrl: obj.avatar,
        selected: false,
      }));
      setData(transformedData);
    })();
  }, []);
  const [searchedData, setSearchValue] = useFilter(data, (data) => data.title);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  if (!data) {
    return <div>getting user data...</div>;
  }
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!inputRef.current || inputRef.current.value !== "") {
      return;
    }
    if(!chips.length){
      return
    }
    if (e.key === "Backspace") {
      backspaceCountRef.current += 1;
      if (backspaceCountRef.current === 1) {
        setChips((prevChips) =>
          prevChips.map((chip, index) =>
            index === prevChips.length - 1 ? { ...chip, selected: true } : chip
          )
        );
      } else if (backspaceCountRef.current === 2) {
        const id = chips[chips.length - 1].id;
        removeChip(id);
        backspaceCountRef.current = 0;
      }
    }
  };
  const handleSelect = (id: string) => {
    setChips(
      (currentChips) =>
        [
          ...currentChips,
          { ...data.find((x) => x.id === id), selected: false },
        ] as SuggestionsData[]
    );
    setData((prev) => prev.filter((x) => x.id !== id));
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };
  const removeChip = (id: string) => {
    setData(
      (prev) => [...prev, chips.find((x) => x.id === id)] as SuggestionsData[]
    );
    setChips((currentChips) => currentChips.filter((x) => x.id !== id));
  };
  return (
    <main className="flex flex-col gap-10 items-center justify-between p-24">
      <h1 className="text-2xl">Pick Users</h1>

      <div className="w-full flex gap-2 pb-2 items-center flex-wrap border-b-2 border-blue-400 ">
        {chips.length !== 0 &&
          chips.map((chip) => (
            <Chip
              selected={chip.selected}
              key={chip.id}
              id={chip.id}
              title={chip.title}
              imageUrl={chip.imageUrl}
              onClose={removeChip}
            />
          ))}
        <div className="relative w-96">
          <Input
            onFocus={() => setSuggestionsVisible(true)}
            onChange={(e) => setSearchValue(e.target.value)}
            ref={inputRef}
            onKeyDown={handleKeyDown}
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
