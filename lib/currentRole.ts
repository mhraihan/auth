import currentUser from '@/lib/currentUser';
import { UserRole } from '@prisma/client';

export const currentRole = async () => {
  const user = await currentUser();
  return user?.role ?? UserRole.USER;
}
