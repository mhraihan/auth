import { ExtendedUser } from "@/types/next-auth";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}
const UserInfo = ({ label, user }: UserInfoProps) => {
  const userInfo = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
    isTwoFactorEnabled: user?.isTwoFactorEnabled,
  };
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(userInfo).map(([label, value]) => (
          <div
            className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
            key={label}
          >
            <p className="text-sm font-medium">{label}</p>
            {label === "isTwoFactorEnabled" ? (
              <Badge
                variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
              >
                {user?.isTwoFactorEnabled ? "ON" : "OFF"}
              </Badge>
            ) : (
              <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                {value}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UserInfo;
