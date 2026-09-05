"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !photoRef.current) return;

    // Pin the container and scrub the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // 1.5 viewport heights of scrolling duration
        pin: true,
        scrub: 1, // Smooth scrubbing
      }
    });

    // 1. Animate the photo to fill the screen
    tl.to(photoRef.current, {
      width: "100vw",
      height: "100vh",
      borderRadius: "0px",
      ease: "power2.inOut"
    }, 0);

    // 2. Fade out all text elements and accents
    tl.to(".hero-ui", { 
      opacity: 0, 
      scale: 0.95,
      ease: "power1.inOut" 
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full bg-[#050505] overflow-hidden" 
    >
      
      {/* Noise Texture to kill the "void" feeling */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.25] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Subtle Background Marquee (Outline Text) - Fills empty space elegantly */}
      <div className="hero-ui absolute top-[20%] md:top-[15%] left-0 w-full overflow-hidden z-[2] pointer-events-none opacity-60 anim-fade-in">
        <div 
          className="flex w-max whitespace-nowrap font-serif text-[30vw] md:text-[22vw] uppercase leading-none marquee-track"
          style={{ 
            color: "transparent", 
            WebkitTextStroke: "1px rgba(239, 238, 233, 0.2)" /* Subtle Cream Outline */
          }}
        >
          <span className="pr-[8vw]">SAMPAI JUMPA</span>
          <span className="pr-[8vw]">SAMPAI JUMPA</span>
          <span className="pr-[8vw]">SAMPAI JUMPA</span>
        </div>
      </div>

      {/* UI Accents (Top Left & Top Right) */}
      <div className="hero-ui absolute top-6 md:top-10 left-6 md:left-10 z-30 font-hn text-[10px] md:text-xs text-cream/70 uppercase tracking-widest pointer-events-none anim-fade-in">
        [ THE ARCHIVE ]<br/>
        Est. {new Date().getFullYear()}
      </div>
      <div className="hero-ui absolute top-6 md:top-10 right-6 md:right-10 z-30 font-hn text-[10px] md:text-xs text-cream/70 uppercase tracking-widest text-right pointer-events-none anim-fade-in">
        VOL. 01<br/>
        LAT 34.05 LON 118.24
      </div>

      {/* Left Typography */}
      <div className="hero-ui absolute top-[30%] md:top-1/2 -translate-y-1/2 left-4 md:left-10 lg:left-16 z-30 pointer-events-none anim-fade-in">
        <h1 className="font-serif text-[22vw] md:text-[10vw] text-cream uppercase leading-none tracking-tighter drop-shadow-2xl">
          SAMPAI
        </h1>
        {/* Editorial Paragraph */}
        <p className="font-hn text-[11px] md:text-xs text-cream/80 mt-2 md:mt-4 max-w-[180px] md:max-w-[200px] leading-relaxed drop-shadow-md">
          Sebuah rekaman visual dari perjalanan kita. Mengabadikan setiap tawa, momen, dan cerita di satu tempat.
        </p>
      </div>

      {/* Right Typography */}
      <div className="hero-ui absolute top-[70%] md:top-1/2 -translate-y-1/2 right-4 md:right-10 lg:right-16 z-30 text-right pointer-events-none anim-fade-in">
        <h1 className="font-serif text-[22vw] md:text-[10vw] text-cream uppercase leading-none tracking-tighter drop-shadow-2xl">
          JUMPA
        </h1>
        <p className="font-serif text-sm md:text-xl text-cream/90 italic font-light tracking-[0.05em] mt-2 md:mt-4 max-w-[150px] md:max-w-xs ml-auto drop-shadow-md">
          Memori pertemanan kita.
        </p>
      </div>

      {/* Bottom Corner Labels (To anchor the layout) */}
      <div className="hero-ui absolute bottom-8 left-6 md:left-10 z-30 font-hn text-[10px] md:text-xs text-cream/40 uppercase tracking-[0.2em] pointer-events-none anim-fade-in">
        01 / 01 — THE GANG
      </div>
      <div className="hero-ui absolute bottom-8 right-6 md:right-10 z-30 font-hn text-[10px] md:text-xs text-cream/40 uppercase tracking-[0.2em] text-right pointer-events-none anim-fade-in">
        CHAPTER ONE
      </div>

      {/* Center Tombstone Photo */}
      <div 
        ref={photoRef} 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-[60vw] md:w-[35vw] lg:w-[28vw] h-[60vh] md:h-[75vh] rounded-t-[500px] rounded-b-none overflow-hidden anim-fade-in shadow-[0_0_100px_rgba(0,0,0,0.8)]"
      >
        <img 
          src="/Foto-atas/IMG-20260815-WA0046.jpg" 
          alt="The Gang" 
          className="w-full h-full object-cover"
        />
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

    </section>
  );
}
