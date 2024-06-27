import type { UserFormValue } from "@/types";

interface PersonalProps {
  data: UserFormValue;
}

export default function Personal({ data }: PersonalProps) {
  return (
    <div>
      <p>
        {data.firstName} {data.secondName}
      </p>
    </div>
  );
}
