import { currentRole } from "@/lib/currentRole";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN) {
    return new NextResponse(null, { status: 403 });
  }
  return new NextResponse(null, { status: 200 });
};
