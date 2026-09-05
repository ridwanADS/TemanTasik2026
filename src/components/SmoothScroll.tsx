"use client";

import { useEffect, useRef } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    // Sync GSAP ticker with Lenis to prevent flickering/jittering
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // Optional but recommended for ScrollTrigger + Lenis

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis ref={lenisRef} root autoRaf={false} options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
      {children as any}
    </ReactLenis>
  );
}
