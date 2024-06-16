"use client";

import React from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { cn } from "@/lib/utils";

export const Lottie = ({
  src,
  className,
  width,
  height,
}: {
  className?: string;
  width?: number;
  height?: number;
  src: string;
}) => {
  return (
    <DotLottiePlayer
      style={{ width, height }}
      className={cn("flex justify-center items-center h-screen", className)}
      autoplay
      loop
      src={src}
    />
  );
};
