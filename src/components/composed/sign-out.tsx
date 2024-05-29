"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { useSignOutMutation } from "@/hooks/use-mutations";

export function SignOut() {
  const router = useRouter();

  const signOut = useSignOutMutation();

  const handleSignOut = async () => {
    signOut.mutateAsync();
    router.refresh();
  };

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>{signOut.isPending ? "Loading..." : "Sign out"}</span>
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
