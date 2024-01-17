"use client";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const ProtectedPage = () => {
  const session = useSession();
  return (
    <>
      <LogoutButton>
        <Button>Logout</Button>
      </LogoutButton>
    </>
  );
};

export default ProtectedPage;
