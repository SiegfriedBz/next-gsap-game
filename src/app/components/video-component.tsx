import { forwardRef } from "react";

type Props = React.VideoHTMLAttributes<HTMLVideoElement> & {
  videoUrl: string;
};

const VideoComponent = forwardRef<HTMLVideoElement, Props>(
  ({ videoUrl, ...rest }, ref) => {
    console.log("ref", ref);
    return (
      <video
        ref={ref}
        {...rest}
        src={videoUrl}
        preload="true"
        loop
        muted
        autoPlay
        aria-label="Video player"
      />
    );
  }
);

VideoComponent.displayName = "VideoComponent";
export default VideoComponent;
