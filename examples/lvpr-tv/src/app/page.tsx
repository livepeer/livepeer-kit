import {
  PlayerLoading,
  PlayerProps,
  PlayerWithControls,
} from "@/components/player/Player";
import { Booleanish } from "@/lib/types";
import { coerceToBoolean } from "@/lib/utils";
import { ClipLength } from "@livepeer/react";
import { Suspense } from "react";

type Autoplay = Booleanish;
type Muted = Booleanish;
type Loop = Booleanish;
type LowLatency = Booleanish | "force";
type ObjectFit = "contain" | "cover";
type Constant = Booleanish;
type Debug = Booleanish;

type PlayerSearchParams = {
  v?: string;
  playbackId?: string;
  url?: string;
  autoplay?: Autoplay;
  muted?: Muted;
  loop?: Loop;
  lowLatency?: LowLatency;
  objectFit?: ObjectFit;
  constant?: Constant;
  clipLength?: ClipLength;
  jwt?: string;
  debug?: Debug;
};

export default async function PlayerPage({
  searchParams,
}: {
  searchParams: Partial<PlayerSearchParams>;
}) {
  const props: PlayerProps = {
    type: "iframe",
    url: searchParams?.url ?? null,
    playbackId: searchParams?.v ?? searchParams?.playbackId ?? null,
    autoplay: coerceToBoolean(searchParams?.autoplay, true),
    muted: coerceToBoolean(searchParams?.muted, false),
    constant: coerceToBoolean(searchParams?.constant, false),
    loop: coerceToBoolean(searchParams?.loop, false),
    lowLatency:
      searchParams?.lowLatency === "force"
        ? "force"
        : coerceToBoolean(searchParams?.lowLatency, true),
    objectFit: searchParams?.objectFit ?? "contain",
    clipLength: searchParams?.clipLength
      ? (Number(searchParams.clipLength) as ClipLength)
      : null,
    jwt: searchParams?.jwt ?? null,
    debug: coerceToBoolean(searchParams?.debug, false),
  };

  return (
    <main className="absolute flex flex-col justify-center items-center h-full w-full inset-0 bg-black">
      <Suspense fallback={<PlayerLoading />}>
        <PlayerWithControls {...props} />
      </Suspense>
    </main>
  );
}

export async function generateStaticParams() {
  return [
    {
      type: "asset",
    },
    {
      type: "livestream",
    },
  ];
}
