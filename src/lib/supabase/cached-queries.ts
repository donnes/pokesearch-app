import { unstable_cache } from "next/cache";

import { getUserQuery } from "./queries";
import { createClient } from "./server";

export async function getUser() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session?.user.id;

  if (!userId) {
    return null;
  }

  return unstable_cache(
    async () => {
      return getUserQuery(supabase, userId);
    },
    ["user", userId],
    {
      tags: [`user_${userId}`],
      revalidate: 180,
    },
  )();
}
