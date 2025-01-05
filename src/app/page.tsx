import { HERO_IMG_NUM } from "@/constants";
import { getVideoUrl } from "./actions/get-video-url";
import Hero from "./components/hero";

const HERO_IMG_NAMES = Array.from({ length: HERO_IMG_NUM }, (_, idx) => {
  return `hero-${idx + 1}`;
});

export default async function Home() {
  const videoUrlsMap = Object.fromEntries(
    await Promise.all(
      HERO_IMG_NAMES.map(async (name, idx) => [
        idx + 1,
        await getVideoUrl(name),
      ])
    )
  );

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero videoUrlsMap={videoUrlsMap} />
      <div className="h-screen" />
    </main>
  );
}
