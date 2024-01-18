"use server";

import { currentRole } from "@/lib/currentRole";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN) {
    return { error: "Forbidden Server action!" };
  }
  return { success: "Allowed Server action!" };
};
