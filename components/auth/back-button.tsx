import { Button } from "@/components/ui/button";
import Link from "next/link";
interface BackButtonProps {
  label: string;
  href: string;
}
export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button className="w-full font-normal" asChild variant={"link"} size={"sm"}>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
