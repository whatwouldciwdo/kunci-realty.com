"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export default function ScrollExpandImageSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pinPhase, setPinPhase] = useState<"before" | "active" | "after">("before");
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  // Give the animation its own scroll runway. Native scrolling remains the
  // only scroll controller, so entering and reversing the scene use exactly
  // the same coordinates without scrollTo/scrollBy boundary corrections.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Finish the visual expansion before the sticky scene releases. The
  // remaining runway is an intentional fullscreen hold, preventing the next
  // section from appearing while the image is still growing or cross-fading.
  const expansionProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scrollProgress = useSpring(expansionProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.5,
  });

  useEffect(() => {
    let frame = 0;
    const updatePin = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const nextPhase =
          rect.top > 0
            ? "before"
            : rect.bottom <= window.innerHeight
              ? "after"
              : "active";
        setPinPhase((current) => current === nextPhase ? current : nextPhase);
      });
    };

    updatePin();
    window.addEventListener("scroll", updatePin, { passive: true });
    window.addEventListener("resize", updatePin);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updatePin);
      window.removeEventListener("resize", updatePin);
    };
  }, []);

  // Keep the editorial card small while it enters, then grow it until its
  // edges are exactly flush with the viewport.
  const imageWidth = useTransform(
    scrollProgress,
    [0, 1],
    prefersReducedMotion
      ? ["100vw", "100vw"]
      : [isMobile ? "58vw" : "25vw", "100vw"]
  );
  const imageHeight = useTransform(
    scrollProgress,
    [0, 1],
    prefersReducedMotion
      ? ["100dvh", "100dvh"]
      : [isMobile ? "34dvh" : "30dvh", "100dvh"]
  );
  const borderRadius = useTransform(scrollProgress, [0, 1], ["10px", "0px"]);
  const borderWidth = useTransform(scrollProgress, [0, 1], ["5px", "0px"]);
  const boxShadow = useTransform(
    scrollProgress,
    [0, 1],
    ["0 20px 50px rgba(0,0,0,0.12)", "0 0px 0px rgba(0,0,0,0)"]
  );
  const imgScale = useTransform(scrollProgress, [0, 1], [1, 1.04]);

  // Side text position and opacity transforms
  const textLeftX = useTransform(scrollProgress, [0, 0.55], ["0px", "-12vw"]);
  const textRightX = useTransform(scrollProgress, [0, 0.55], ["0px", "12vw"]);
  const textOpacity = useTransform(scrollProgress, [0, 0.5], [1, 0]);

  // Labels opacity (EST 1990 and JAKARTA)
  const labelsOpacity = useTransform(scrollProgress, [0, 0.42], [1, 0]);

  // Image sequence cross-fade opacities while image is pinned full screen:
  // Image 1: Fluted glass / dark marble detail (starts 1.0 -> fades out at 0.62)
  const img1Opacity = useTransform(scrollProgress, [0, 0.48, 0.6], [1, 1, 0]);

  // Image 2: Craftsman inspecting timber (fades in 0.52 -> 0.62, fades out 0.78 -> 0.88)
  const img2Opacity = useTransform(scrollProgress, [0.5, 0.6, 0.75, 0.84], [0, 1, 1, 0]);

  // Image 3: Modern kitchen with brass linear pendant light (fades in 0.78 -> 0.88, stays till end)
  const img3Opacity = useTransform(scrollProgress, [0.75, 0.84, 1], [0, 1, 1]);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        // One viewport for the expansion, two viewports holding the finished
        // frame. The next section cannot enter until this scene is complete.
        height: "300dvh",
        backgroundColor: "#ffffff",
        isolation: "isolate",
      }}
    >
      {/* Explicit pinning avoids browser-specific sticky failures caused by
          scroll ancestors. Before/after states remain anchored to this
          section; only the active state is fixed to the viewport. */}
      <motion.div
        style={{
          position: pinPhase === "active" ? "fixed" : "absolute",
          top: pinPhase === "after" ? "auto" : 0,
          bottom: pinPhase === "after" ? 0 : "auto",
          left: 0,
          height: "100dvh",
          width: "100%",
          zIndex: 2,
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Main Content Layout Wrapper */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Left Text: "Bespoke" */}
          <motion.div
            style={{
              position: "absolute",
            left: isMobile ? "50%" : "clamp(1rem, 8vw, 14rem)",
            top: isMobile ? "10%" : "auto",
            translateX: isMobile ? "-50%" : "0%",
              zIndex: 3,
              x: textLeftX,
              opacity: textOpacity,
              pointerEvents: "none",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: isMobile ? "clamp(2rem, 10vw, 3rem)" : "clamp(3rem, 7vw, 6.5rem)",
                fontWeight: 700,
                color: "#111827",
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              Eksklusif
            </h2>
          </motion.div>

          {/* Labels are absolutely positioned so they never add to the frame's
              height. This lets the final frame fit 100dvh without overflow. */}
          <motion.span
            style={{
              position: "absolute",
              left: "50%",
              top: isMobile ? "calc(50% - 23dvh)" : "calc(50% - clamp(130px, 19dvh, 180px))",
              translateX: "-50%",
              opacity: labelsOpacity,
              zIndex: 6,
              fontSize: isMobile ? "0.58rem" : "clamp(0.65rem, 0.8vw, 0.8rem)",
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: "#333333",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            EST. 1990
          </motion.span>

          {/* Expanding Animated Image Frame */}
          <motion.div
            style={{
              width: imageWidth,
              height: imageHeight,
              borderRadius,
              borderWidth,
              borderStyle: "solid",
              borderColor: "#ffffff",
              boxShadow,
              overflow: "hidden",
              position: "relative",
              zIndex: 5,
              flexShrink: 0,
              willChange: "width, height, border-radius",
              backgroundColor: "#ffffff",
            }}
          >
              {/* Image 1: Fluted glass & dark marble texture */}
              <motion.img
                src="/images/haven_seq_1.jpg"
                alt="Material Arsitektur Eksklusif"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  scale: imgScale,
                  opacity: img1Opacity,
                }}
              />

              {/* Image 2: Master Craftsman inspecting timber */}
              <motion.img
                src="/images/haven_seq_2.jpg"
                alt="Pengrajin Ahli"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  scale: imgScale,
                  opacity: img2Opacity,
                }}
              />

              {/* Image 3: Modern kitchen with brass linear pendant light */}
              <motion.img
                src="/images/haven_seq_3.jpg"
                alt="Interior Hunian Mewah Kunci Realty"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  scale: imgScale,
                  opacity: img3Opacity,
                }}
              />
          </motion.div>

          <motion.span
            style={{
              position: "absolute",
              left: "50%",
              top: isMobile ? "calc(50% + 23dvh)" : "calc(50% + clamp(125px, 18dvh, 170px))",
              translateX: "-50%",
              opacity: labelsOpacity,
              zIndex: 6,
              fontSize: isMobile ? "0.58rem" : "clamp(0.65rem, 0.8vw, 0.8rem)",
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: "#333333",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            JAKARTA
          </motion.span>

          {/* Right Text: "Luxury" */}
          <motion.div
            style={{
              position: "absolute",
              right: isMobile ? "50%" : "clamp(1rem, 8vw, 14rem)",
              top: isMobile ? "auto" : undefined,
              bottom: isMobile ? "10%" : undefined,
              translateX: isMobile ? "50%" : "0%",
              zIndex: 3,
              x: textRightX,
              opacity: textOpacity,
              pointerEvents: "none",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: isMobile ? "clamp(2rem, 10vw, 3rem)" : "clamp(3rem, 7vw, 6.5rem)",
                fontWeight: 700,
                color: "#111827",
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              Mewah
            </h2>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
