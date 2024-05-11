import Image from "next/image";
import Link from "next/link";

export function PokemonListItem() {
  return (
    <Link
      href="/pokemon/1"
      className="rounded-xl group hover:shadow-xl transition duration-200 shadow-input p-4 bg-zinc-950/50 border-zinc-800 border justify-between flex flex-col space-y-4"
    >
      <div className="flex flex-1 w-full h-full min-h-40 rounded-lg border border-white/[0.2] bg-white">
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          width={200}
          height={200}
          alt="Bulbasaur"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="group-hover:translate-x-2 transition duration-200">
        <span className="text-xs">#0001</span>
        <div className="font-sans font-bold text-zinc-200 mb-2 mt-2">
          Bulbasaur
        </div>
        <div className="font-sans font-normal text-xs text-zinc-300">
          Description
        </div>
      </div>
    </Link>
  );
}
