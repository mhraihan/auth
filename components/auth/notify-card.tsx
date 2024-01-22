"use client";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import CardWrapper from "./card-wrapper";
const NotifyCard = () => {
  return (
    <>
      <CardWrapper
        headerLabel="Please Verify your email"
        backButtonHref="/auth/login"
        backButtonLabel="Back to Login"
      >
        <div className="flex w-full justify-center items-center">
          <CheckCircledIcon className="text-emerald-500 w-8 h-8" />
        </div>
      </CardWrapper>
    </>
  );
};

export default NotifyCard;
