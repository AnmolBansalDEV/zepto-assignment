import Image from "next/image";

type SuggestionsData = {
  id: string;
  imageUrl: string;
  title: string;
  selected: boolean,
  description: string;
};

type Props = {
  data: SuggestionsData[];
  onItemSelect: (id: string) => void;
};

const Suggestions = ({ data, onItemSelect }: Props) => {
  return (
    <ul
      className="absolute mt-3 w-full max-h-72 overflow-auto rounded-md bg-slate-50 shadow-2xl"
      >
      {data.map((entry) => (
        <li
        key={entry.id}
        className="cursor-pointer flex w-full justify-between items-center py-2 px-3 hover:bg-slate-100"
        onClick={() => onItemSelect(entry.id)}
        >
          <div className="flex gap-2 items-center">
            <div className="relative w-10 h-10 rounded-full">
              <Image
                className="rounded-full"
                fill={true}
                alt="avatar"
                src={entry.imageUrl}
              />
            </div>
            <p className="text-sm whitespace-nowrap font-medium text-gray-600">
              {entry.title}
            </p>
          </div>
          <p className="text-sm text-gray-500">{entry.description}</p>
        </li>
      ))}
    </ul>
  );
};

export type { Props as SuggestionsProps, SuggestionsData };
export default Suggestions;
