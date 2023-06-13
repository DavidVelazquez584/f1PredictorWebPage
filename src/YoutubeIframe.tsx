import React, { useState, useEffect, useCallback, useRef } from "react";

interface IProps {
  videoId: string;
  autoPlay?: boolean;
  title: string;
}

const VideoIframe: React.FC<IProps> = (props) => {
  const { videoId, autoPlay, title } = props;
  const videoURL = `https://www.youtube.com/embed/${videoId}${
    autoPlay ? "?autoplay=1" : ""
  }`;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [videoHeight, setVideoHeight] = useState<number>(
    iframeRef.current && ((iframeRef.current.offsetWidth) * 30) / 100
  );

  const handleChangeVideoWidth = useCallback(() => {
    const ratio =
      window.innerWidth > 990
        ? 1.0
        : window.innerWidth > 522
        ? 1.2
        : window.innerWidth > 400
        ? 1.45
        : 1.85;
    const height = iframeRef.current
      && ((iframeRef.current.offsetWidth) * 30) / 100
    return setVideoHeight(Math.floor(height * ratio));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleChangeVideoWidth);
    const ratio =
      window.innerWidth > 990
        ? 1.0
        : window.innerWidth > 522
        ? 1.2
        : window.innerWidth > 400
        ? 1.45
        : 1.85;
    const height = iframeRef.current
      && ((iframeRef.current.offsetWidth) * 30) / 100;
    setVideoHeight(Math.floor(height * ratio));
    return function cleanup() {
      window.removeEventListener("resize", handleChangeVideoWidth);
    };
  }, [videoHeight, handleChangeVideoWidth]);

  return (
    <iframe
      ref={iframeRef}
      title={title}
      width="90%"
      height={`${videoHeight}px`}
      src={videoURL}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default VideoIframe;
