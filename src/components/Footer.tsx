"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!footerRef.current || !textRef.current) return;

    // Subtle parallax effect on the massive text as the footer scrolls into view
    gsap.fromTo(textRef.current,
      { y: 100, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative w-full bg-[#050505] text-cream flex flex-col items-center justify-center pt-32 pb-10 px-6 overflow-hidden z-50"
    >
      <div className="max-w-[1400px] w-full flex flex-col items-center text-center">
        
        {/* Massive Typography Message */}
        <h2 
          ref={textRef}
          className="text-[12vw] sm:text-[10vw] leading-[0.85] font-hn uppercase tracking-tighter text-cream mb-12 mix-blend-difference"
        >
          Never<br />Forget
        </h2>

        {/* Heartfelt Paragraph */}
        <div className="max-w-2xl mt-8 mb-32 relative z-10">
          <p className="text-xl md:text-3xl text-cream/80 font-light leading-relaxed">
            "Ke manapun langkah membawa kita, sejauh apapun jarak memisahkan... <br/>
            <span className="font-medium text-cream italic mt-4 block">
              jangan pernah lupakan cerita dan pertemanan kita."
            </span>
          </p>
        </div>
        
        {/* Bottom Credits / Meta */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between border-t border-cream/20 pt-8 mt-12 text-xs md:text-sm text-cream/40 uppercase tracking-[0.2em]">
          <span className="mb-4 md:mb-0">© {new Date().getFullYear()} Sebuah Kenangan Abadi</span>
          
          <div className="flex gap-8">
            <span className="hover:text-cream transition-colors duration-300 cursor-default">Forever</span>
            <span className="hover:text-cream transition-colors duration-300 cursor-default">&amp; Always</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
