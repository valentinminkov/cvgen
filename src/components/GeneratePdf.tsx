import type { MouseEvent } from "react";
import { translations } from "@/config/content";
import DrawerDialog from "./DrawerDialog";
import { Button } from "@/components/ui/button";

interface Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function GeneratePdfDialog({ onClick }: Props) {
  return (
    <DrawerDialog
      content={<GeneratePdf onClick={onClick} />}
      title={translations.GENERATE_PDF}
      description={translations.GENERATE_PDF_DESCRIPTION}
    />
  );
}

function GeneratePdf({ onClick }: Props) {
  return (
    <form className={"grid items-start gap-4"}>
      <p className="text-blue-500">Some settings...</p>
      <Button type="submit" onClick={(e) => onClick(e)}>
        {translations.GENERATE}
      </Button>
    </form>
  );
}
