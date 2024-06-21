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

const ENTRIES_DEFAUL_LABEL = "Entries";

export function ListEntryContainer({
  children,
  classes,
}: {
  children: JSX.Element;
  classes?: string;
}) {
  return (
    <div className={`bg-gray-500 p-5 w-4/12 w-full ${classes}`}>{children}</div>
  );
}
export function ListEntryTitle({
  entriesLabel,
  entriesLength,
}: ListEntryTitleProps) {
  return (
    <p className="pb-4">
      {entriesLabel ?? ENTRIES_DEFAUL_LABEL} ({entriesLength})
    </p>
  );
}

export function ListEntryCard({ index, removeEntry, content, date }: Props) {
  return (
    <div className="bg-gray-600 p-5 flex flex-col gap-6">
      <div
        onClick={() => {
          removeEntry(index);
        }}
        className="cursor-pointer hover:opacity-50 p-2"
      >
        <CrossCircledIcon />
      </div>

      {date && (
        <div className="px-2 pb-2 ">
          <span>
            {date.startDate?.toString()}{" "}
            {date?.ongoing ? "- ongoing" : ` - ${date?.endDate?.toString()}`}
          </span>
        </div>
      )}

      {content.map((entry) => (
        <div>
          {entry.label && (
            <div>
              <h2 className="flex flex-col gap-2 px-2">
                <Label>{entry.label}</Label>
              </h2>
              <p className="flex flex-col gap-2 px-2">{entry.value}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
