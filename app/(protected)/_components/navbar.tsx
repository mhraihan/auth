"use client";
import UserButton from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "Server",
    link: "/server",
  },
  {
    label: "Client",
    link: "/client",
  },
  {
    label: "Admin",
    link: "/admin",
  },
  {
    label: "Settings",
    link: "/settings",
  },
];
const Navbar = () => {
  const pathName = usePathname();
  return (
    <div className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        {routes.map((route) => (
          <Button
            key={route.link}
            asChild
            variant={pathName === route.link ? "default" : "outline"}
          >
            <Link href={route.link}>{route.label}</Link>
          </Button>
        ))}
      </div>
      <UserButton />
    </div>
  );
};

export default Navbar;
