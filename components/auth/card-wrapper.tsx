import { PropsWithChildren } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Header } from "./Header";
import { Social } from "./Social";
import { BackButton } from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}
const CardWrapper = ({
  children,
  backButtonHref,
  backButtonLabel,
  headerLabel,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <BackButton href={backButtonHref} label={backButtonLabel} />
    </Card>
  );
};

export default CardWrapper;
