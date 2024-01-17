"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ExitIcon } from "@radix-ui/react-icons";
import { FaUser } from "react-icons/fa";
import { LogoutButton } from "./logout-button";

const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {user?.image && <AvatarImage src={user.image} />}
          <AvatarFallback className="bg-sky-500 outline-none">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="font-normal">
          {user?.name}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="font-normal">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <ExitIcon className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
