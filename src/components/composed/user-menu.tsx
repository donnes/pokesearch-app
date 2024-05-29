import Image from "next/image";
import Link from "next/link";

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
import { getUser } from "@/lib/supabase/cached-queries";

import { User } from "lucide-react";
import { SignOut } from "./sign-out";

export async function UserMenu() {
  const user = await getUser();

  if (!user || !user.data) return null;

  const userData = user.data;

  const avatarFallback = userData?.full_name
    ? userData.full_name.charAt(0)
    : userData.email.charAt(0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="rounded-full w-8 h-8 cursor-pointer">
          {userData?.avatar_url && (
            <Image
              src={userData.avatar_url}
              alt={userData?.full_name ?? userData.email}
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
            {userData?.full_name && (
              <span className="truncate">{userData.full_name}</span>
            )}
            <span className="truncate text-xs text-zinc-400 font-normal">
              {userData.email}
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
