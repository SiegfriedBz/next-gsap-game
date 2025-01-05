"use client";

import { forwardRef, useEffect, useState } from "react";
import VideoComponent from "./video-component";
import { getVideoUrl } from "../actions/get-video-url";

type Props = React.VideoHTMLAttributes<HTMLVideoElement> & {
  fileName: string;
};

const VideoWrapper = forwardRef<HTMLVideoElement, Props>(
  ({ fileName, ...rest }, ref) => {
    const [videoUrl, setVideoUrl] = useState<string>("");

    useEffect(() => {
      (async () => {
        try {
          const url = await getVideoUrl(fileName);
          if (!url) return;

          setVideoUrl(url);
        } catch (error) {
          console.log("VideoWrapper ERROR", error);
        }
      })();
    }, [fileName]);

    if (!videoUrl) return null;

    return <VideoComponent ref={ref} videoUrl={videoUrl} {...rest} />;
  }
);

VideoWrapper.displayName = "VideoWrapper";
export default VideoWrapper;
