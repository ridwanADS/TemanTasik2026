"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import memoriesData from "@/data/memoriesData.json";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function MemoryGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    // Staggered entrance animation for grid items
    const items = gsap.utils.toArray(containerRef.current.querySelectorAll('.bento-item'));
    
    gsap.fromTo(items, 
      { opacity: 0, y: 100, scale: 0.95 },
      {
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 1,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%", // Triggers when the top of the grid hits 75% of viewport
          toggleActions: "play none none reverse"
        }
      }
    );

    // Inner Parallax for Media (gives depth to the grid)
    items.forEach((itemWrapper) => {
      const media = (itemWrapper as Element).querySelector('.media-content');
      if (media) {
        gsap.fromTo(media, 
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: itemWrapper as Element,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="w-full bg-cream z-40 relative py-24 md:py-32"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#050505]/20 pb-8">
          <div>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-hn text-[#050505] uppercase tracking-tighter">
              The Archive
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-[#050505]/60 text-sm md:text-base max-w-xs uppercase tracking-widest">
            A curated collection of captured moments, unscripted memories, and random fragments of time.
          </div>
        </div>
        
        {/* Bento Grid Container - grid-flow-dense is crucial to pack items without gaps */}
        <div 
          ref={containerRef} 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[150px] sm:auto-rows-[250px] md:auto-rows-[300px] gap-2 md:gap-4 grid-flow-dense"
        >
          {memoriesData.map((item, i) => (
            <div 
              key={i} 
              className={`bento-item relative w-full h-full overflow-hidden rounded-xl bg-[#111] group shadow-lg ${item.span}`}
            >
              {/* Media Content */}
              {item.type === "video" ? (
                <video 
                  src={item.src} 
                  autoPlay loop muted playsInline
                  className="media-content absolute inset-0 w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-105 origin-center -top-[10%]"
                />
              ) : (
                <Image 
                  src={item.src} 
                  alt={`Memory ${i}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="media-content object-cover transition-transform duration-700 group-hover:scale-105 origin-center !h-[120%] !-top-[10%]"
                />
              )}

              {/* Dark Overlay on Hover (Optional, kept minimal since there's no text) */}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20 z-10 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
