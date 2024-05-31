import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getUser } from "@/@server/queries/get-user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SignOut } from "./sign-out";

export async function UserMenu() {
  const { data: user } = await getUser();

  if (!user) return null;

  const avatarFallback = user?.full_name
    ? user.full_name.charAt(0)
    : user.email.charAt(0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="rounded-full w-8 h-8 cursor-pointer">
          {user?.avatar_url && (
            <Image
              src={user.avatar_url}
              alt={user?.full_name ?? user.email}
              width={32}
              height={32}
            />
          )}
          <AvatarFallback>
            <span className="text-xs">{avatarFallback.toUpperCase()}</span>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]" sideOffset={10} align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            {user?.full_name && (
              <span className="truncate">{user.full_name}</span>
            )}
            <span className="truncate text-xs text-zinc-400 font-normal">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
