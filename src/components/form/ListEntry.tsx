import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";

export interface ListEntryContent {
  value: string;
  label?: string;
}

export interface ListEntryDate {
  startDate: Date;
  ongoing?: boolean;
  endDate?: Date;
}

interface Props {
  index: number;
  content: ListEntryContent[];
  removeEntry: (index: number) => void;
  date?: ListEntryDate;
}

interface ListEntryTitleProps {
  entriesLength: number;
  entriesLabel?: string;
}

const ENTRIES_DEFAULT_LABEL = "Entries";

export function ListEntryContainer({
  children,
  classes,
}: {
  children: JSX.Element;
  classes?: string;
}) {
  return (
    <div
      className={`bg-gray-500 p-5 w-full border border-gray-400 rounded ${classes}`}
    >
      {children}
    </div>
  );
}

export function ListEntryTitle({
  entriesLabel,
  entriesLength,
}: ListEntryTitleProps) {
  return (
    <p className="pb-4 text-lg font-semibold">
      {entriesLabel ?? ENTRIES_DEFAULT_LABEL} ({entriesLength})
    </p>
  );
}

export function ListEntryCard({ index, removeEntry, content, date }: Props) {
  return (
    <div className="bg-gray-600 p-5 flex flex-col gap-6 border border-gray-500 rounded shadow-md">
      <div
        onClick={() => {
          removeEntry(index);
        }}
        className="cursor-pointer hover:opacity-75 p-2 self-end"
      >
        <CrossCircledIcon />
      </div>

      {date && (
        <div className="px-2 pb-2 text-sm text-gray-200">
          <span>
            {date.startDate?.toString()}{" "}
            {date?.ongoing ? "- ongoing" : ` - ${date?.endDate?.toString()}`}
          </span>
        </div>
      )}

      {content.map((entry, i) => (
        <div key={i} className="px-2">
          {entry.label && (
            <div className="flex flex-col gap-2">
              <h2 className="text-md font-medium">
                <Label>{entry.label}</Label>
              </h2>
              <p className="text-sm text-gray-300">{entry.value}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
