"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Cta from "./cta";
import { FaLocationArrow } from "react-icons/fa6";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { HERO_IMG_NUM } from "@/constants";

type Props = {
  videoUrlsMap: Record<number, string>;
};

const Hero = ({ videoUrlsMap }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const growingVideoRef = useRef<HTMLVideoElement | null>(null);
  const currentVideoIdxRef = useRef<number | null>(1);
  const [videoIndex, setVideoIndex] = useState<number>(1);
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadedImagesNum, setLoadedImagesNum] = useState<number>(0);

  const miniVideoIndex = useMemo(
    () => (videoIndex === HERO_IMG_NUM ? 1 : videoIndex + 1),
    [videoIndex]
  );

  useEffect(() => {
    gsap.registerPlugin(useGSAP);
    gsap.registerPlugin(ScrollTrigger);
    setIsClient(true);
  }, []);

  // add growing video effect on miniVideo click
  useGSAP(
    () => {
      if (!isClient) return;

      if (hasClicked && growingVideoRef.current) {
        gsap.set("#growing-video", { visibility: "visible", scale: 0 });

        gsap.to("#growing-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            growingVideoRef.current?.play().catch(() => {});
          },
        });
      }
    },
    {
      dependencies: [videoIndex, hasClicked, isClient, growingVideoRef.current],
      revertOnUpdate: true,
    }
  );

  // add main video cut effect on scroll
  useGSAP(
    () => {
      if (!isClient) return;

      gsap.set("#video-frame", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0% 0% 0% 0%",
      });

      gsap.to("#video-frame", {
        clipPath: "polygon(8% 4%, 84% 2%, 96% 92%, 0% 98%)",
        borderRadius: "0% 36% 44% 16%",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#video-frame",
          start: "center center",
          end: "bottom center",
          scrub: 0.25,
        },
      });
    },
    { dependencies: [isClient], revertOnUpdate: true }
  );

  const handleClickSmallVideo = useCallback(() => {
    setHasClicked(true);
    if (loadedImagesNum < HERO_IMG_NUM) {
      setIsLoading(true);
    }

    currentVideoIdxRef.current = videoIndex;

    setVideoIndex((prev) => (prev + 1 > HERO_IMG_NUM ? 1 : prev + 1));
  }, [loadedImagesNum, videoIndex]);

  const handleOnLoadedData = () => {
    if (loadedImagesNum <= HERO_IMG_NUM) {
      setLoadedImagesNum((prev) => prev + 1);
      setIsLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="relative h-svh w-screen">
      {isLoading && (
        <div className="absolute-center z-[999]">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <h2 className="absolute bottom-6 right-6 text-black   hero-heading">
        G<strong>a</strong>ming
      </h2>
      <div
        id="video-frame"
        className="relative h-svh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div className="absolute z-50 top-10 left-6 sm:left-12 text-blue-100 space-y-2 w-screen overflow-hidden">
          <h2 className="hero-heading ">
            Redefi<strong>n</strong>e
          </h2>
          <p className="font-robert-regular mb-4 max-w-64 font-bold ps-2">
            Enter The MetaGame Layer <br />
            Unleash the Play Economy
          </p>
          <Cta
            icon={<FaLocationArrow />}
            label="Watch Trailer"
            className="ms-2 bg-gradient-to-r from-yellow-300 to-yellow-200"
          />
        </div>
        <h2 className="absolute z-40 bottom-6 right-6 text-blue-75/90   hero-heading">
          G<strong>a</strong>ming
        </h2>

        <video
          id="main-video"
          key="main-video"
          src={videoUrlsMap[currentVideoIdxRef.current ?? 1]}
          className="size-full origin-center object-center object-cover"
          preload="true"
          loop
          muted
          autoPlay
          aria-label="Video player"
        />

        <video
          id="growing-video"
          key={`growing-video-${videoIndex}`}
          ref={growingVideoRef}
          src={videoUrlsMap[videoIndex]}
          className="absolute-center invisible z-20 absolute size-full object-cover object-center"
          preload="true"
          loop
          muted
          autoPlay
          aria-label="Video player"
        />

        {/* mini-video @ videoIndex + 1 */}
        <div className="absolute-center size-64 cursor-pointer z-50 rounded-lg  overflow-hidden">
          <div
            onClick={handleClickSmallVideo}
            className="origin-center overflow-hidden"
          >
            <video
              id="mini-video"
              key={`mini-video-${miniVideoIndex}`}
              src={videoUrlsMap[miniVideoIndex]}
              onLoadedData={handleOnLoadedData}
              className="scale-75 opacity-0 transition-all size-64 origin-center object-center object-cover duration-500 hover:opacity-100 hover:scale-100"
              preload="true"
              loop
              muted
              autoPlay
              aria-label="Video player"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
