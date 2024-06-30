import { translations } from "@/config/content";
import DrawerDialog from "./DrawerDialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function GeneratePdfDialog({}: {}) {
  return (
    <DrawerDialog
      content={<GeneratePdf />}
      title={translations.GENERATE_PDF}
      description={translations.GENERATE_PDF_DESCRIPTION}
    />
  );
}

function GeneratePdf({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <p className="text-blue-500">Some settings...</p>
      <Button type="submit">{translations.GENERATE}</Button>
    </form>
  );
}
