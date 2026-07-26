"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress right as section enters viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "start 20%"],
  });

  // Fast expansion right as section enters view (expands to 100% full width quickly)
  const width = useTransform(scrollYProgress, [0, 0.7], ["92%", "100%"]);
  const height = useTransform(scrollYProgress, [0, 0.7], ["80vh", "100vh"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.7], ["16px", "0px"]);
  const videoScale = useTransform(scrollYProgress, [0, 0.7], [1.12, 1.0]);

  return (
    <section
      ref={containerRef}
      id="video-showcase"
      style={{
        // On mobile this section begins immediately after the hero and the
        // video frame fills the marked box. Desktop keeps the original
        // viewport-sized showcase behavior below.
        position: "relative",
        width: "100%",
        height: "100dvh",
        backgroundColor: "#ffffff",
        padding: "0",
        margin: "0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem 0",
        }}
      >
        {/* Fast Expanding Video Frame (92% -> 100% full width on entrance) */}
        <motion.div
          style={{
            width,
            height,
            borderRadius,
            overflow: "hidden",
            position: "relative",
            willChange: "width, height, border-radius",
          }}
        >
          {/* Parallax Scaling Video */}
          <motion.video
            src="/video/Kebayoranbaru-kunci.realty.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              scale: videoScale,
              willChange: "transform",
            }}
          />
        </motion.div>
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
          #video-showcase {
            height: 100svh !important;
            min-height: 100svh !important;
          }

          #video-showcase > div {
            align-items: flex-start !important;
            padding: 0 !important;
          }

          #video-showcase > div > div {
            width: 100% !important;
            height: 100% !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
