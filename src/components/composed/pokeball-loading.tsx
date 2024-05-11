import Image from "next/image";

export function PokeballLoading() {
  return (
    <div className="animate-spin">
      <Image
        src="/pokeball.png"
        width={20}
        height={20}
        alt="Pokeball loading"
      />
    </div>
  );
}
