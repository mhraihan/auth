import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

const ProtectedPage = async () => {
  const session = await auth();
  return (
    <>
      <pre>{JSON.stringify(session)}</pre>
      <form action={async () => {
        "use server"
        await signOut();
      }}>
        <Button type="submit">Logout</Button>
      </form>
    </>
  );
};

export default ProtectedPage;
