import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";

export interface ExperienceCardContent {
  value: string;
  label?: string;
}

export interface ExperienceDate {
  startDate: Date;
  ongoing?: boolean;
  endDate?: Date;
}

interface Props {
  index: number;
  content: ExperienceCardContent[];
  removeExperience: (index: number) => void;
  date?: ExperienceDate;
}

interface ExperienceCardTitleProps {
  entriesLength: number;
  entriesLabel?: string;
}

const ENTRIES_DEFAUL_LABEL = "Entries";
export function ExperienceCardTitle({
  entriesLabel,
  entriesLength,
}: ExperienceCardTitleProps) {
  return (
    <p className="pb-4">
      {entriesLabel ?? ENTRIES_DEFAUL_LABEL} ({entriesLength})
    </p>
  );
}

export function ExperienceCard({
  index,
  removeExperience,
  content,
  date,
}: Props) {
  return (
    <div className="bg-gray-600 p-5 flex flex-col gap-6">
      <div
        onClick={() => {
          removeExperience(index);
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
