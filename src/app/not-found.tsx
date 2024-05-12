import { DotPattern } from "@/components/patterns/dot-pattern";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className="fixed [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      />

      <Image
        src="/not-found-pikachu.png"
        className="w-60 ml-28"
        width={430}
        height={463}
        alt="Not Found"
      />

      <h2 className="text-2xl font-medium leading-loose">Not Found</h2>
      <p>Could not find requested resource</p>

      <div className="mt-4">
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
