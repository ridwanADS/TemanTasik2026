"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const CHARACTERS = [
  {
    name: "Halim Arifsanjani Syaila",
    role: "The Sage",
    description: "Tatapannya mungkin terlihat judes dan dingin pada pandangan pertama, tapi jangan tertipu. Di balik wajah datarnya, Halim adalah sosok paling bijaksana dan pendengar terbaik di antara kita.",
    image: "/Foto-atas/halim.jpg",
    bgColor: "#D4AF37" // Emas (Gold)
  },
  {
    name: "Hernandika Rafli Eriyanto",
    role: "The Unfiltered",
    description: "Awalnya mungkin terlihat pendiam, tapi kalau sudah akrab, siap-siap mendengar komentarnya yang ceplas-ceplos. Dan yang paling ikonik: dia sama sekali tidak bisa menyembunyikan perasaannya lewat ekspresi wajah yang sangat jujur.",
    image: "/Foto-atas/anan.jpg",
    bgColor: "#00A859" // Hijau (#00A859)
  },
  {
    name: "Zahara Ghea Aryanti",
    role: "The Happy Virus",
    description: "Punya teman di mana-mana dan selalu sukses menularkan energi positif lewat tawa cerianya. Meski terlihat selalu bahagia tanpa beban, aslinya ia adalah sosok perasa yang diam-diam sering overthinking.",
    image: "/Foto-atas/IMG_20260824_195652_430.jpg",
    bgColor: "#E58E9B" // Pink Elegan
  },
  {
    name: "Nessa Lamanda Alay Nissa Nugraha",
    role: "The Extra One",
    description: "Bagi yang belum kenal, sosoknya tampak diam dan misterius. Tapi kalau sudah akrab? Keluar deh aslinya yang super centil, banyak tingkah, dan pastinya: alay maksimal!",
    image: "/Foto-atas/IMG_20260724_185804_501.jpg",
    imagePosition: "object-left",
    bgColor: "#87CEEB" // Biru Muda (Sky Blue)
  },
  {
    name: "Ridwan Ady Saputra",
    role: "The Easygoing",
    description: "Bukan tipe yang suka cari perhatian, tapi entah kenapa selalu gampang nyambung ngobrol sama siapa aja. Teman ngopi yang asik, santai, dan fleksibel mau diajak ke mana pun.",
    image: "/Foto-atas/IMG_20260826_214738_225.jpg",
    bgColor: "#BE2525" // Merah
  }
];

export default function CharactersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;
    
    // We get the panels within THIS component instance
    const panels = gsap.utils.toArray(containerRef.current.querySelectorAll(".character-panel"));
    
    if (panels.length === 0) return;

    // Create a timeline that pins the section and scrubs through the panels
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: `+=${panels.length * 100 + 100}%`, // Add 100% extra distance for the overlap reveal
        onUpdate: (self) => {
          if (progressFillRef.current) {
            gsap.set(progressFillRef.current, { scaleX: self.progress });
          }
          if (characterRef.current) {
            gsap.set(characterRef.current, { left: `${self.progress * 100}%` });
          }
        }
      }
    });

    // Make the first panel visible initially
    gsap.set(panels[0] as Element, { zIndex: 10 });
    
    // Set other panels to be clipped at the top initially
    panels.forEach((p, i) => {
      if (i !== 0) {
        gsap.set(p as Element, { clipPath: "inset(0 0 100% 0)", zIndex: 10 + i });
      }
    });

    // Animate each panel in sequence
    panels.forEach((panel, i) => {
      if (i === 0) return; // Skip the first one as it's already visible
      
      // Animate background color of the section
      tl.to(sectionRef.current, {
        backgroundColor: CHARACTERS[i].bgColor,
        duration: 1,
        ease: "power2.inOut"
      }, "+=0.2"); // shorter delay for better responsiveness

      // Push the previous image down slightly to create depth (since wipe comes from top)
      const prevImg = (panels[i - 1] as Element).querySelector('.char-img');
      const prevTextGroup = (panels[i - 1] as Element).querySelector('.text-group');
      const prevMarquee = (panels[i - 1] as Element).querySelector('.bg-marquee');

      if (prevImg) {
        tl.to(prevImg, {
          y: 50,
          scale: 0.95,
          opacity: 0.3,
          duration: 1,
          ease: "power2.inOut"
        }, "<");
      }
      
      // FADE OUT previous text and marquee to prevent stacking
      if (prevTextGroup) {
        tl.to(prevTextGroup, { opacity: 0, y: 20, duration: 0.5, ease: "power2.inOut" }, "<");
      }
      if (prevMarquee) {
        tl.to(prevMarquee, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, "<");
      }

      // Bring in the new panel via a top-to-bottom wipe (clip-path)
      tl.to(panel as Element, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1,
        ease: "power2.inOut"
      }, "<"); // Sync with background change
      
      // Pulling character animation
      tl.set(`.pull-wrapper-${i}`, { opacity: 1 }, "<");
      tl.fromTo(`.pull-wrapper-${i}`, 
        { top: "0%" },
        { top: "100%", duration: 1, ease: "power2.inOut", immediateRender: false },
        "<"
      );
      tl.set(`.pull-wrapper-${i}`, { opacity: 0 });
      
      // Parallax effect on the image inside the panel
      const img = (panel as Element).querySelector('.char-img');
      const textGroup = (panel as Element).querySelector('.text-group');
      const bgMarquee = (panel as Element).querySelector('.bg-marquee');
      
      if (img) {
        tl.fromTo(img, 
          { scale: 1.1, y: 50 },
          { scale: 1, y: 0, duration: 1, ease: "power2.out" },
          "<" // Sync with the panel wipe
        );
      }
      
      if (textGroup) {
         tl.fromTo(textGroup,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "<0.2"
         )
      }

      if (bgMarquee) {
        tl.fromTo(bgMarquee,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
          "<"
        )
      }
    });
    
    // Add a pause at the end of the timeline. 
    // This gives the user time to scroll the extra 100% while the MemoryGallery slides OVER this section.
    tl.to({}, { duration: 1.5 });
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative z-30 h-[100vh] w-full overflow-hidden text-cream"
      style={{ backgroundColor: CHARACTERS[0].bgColor }}
    >
      <div ref={containerRef} className="relative w-full h-full max-w-[1600px] mx-auto">
        <style>{`
          @keyframes walk-leg-f {
            0%, 100% { transform: rotate(35deg); }
            50% { transform: rotate(-35deg); }
          }
          @keyframes walk-leg-b {
            0%, 100% { transform: rotate(-35deg); }
            50% { transform: rotate(35deg); }
          }
          @keyframes walk-arm-f {
            0%, 100% { transform: rotate(-30deg); }
            50% { transform: rotate(30deg); }
          }
          @keyframes walk-arm-b {
            0%, 100% { transform: rotate(30deg); }
            50% { transform: rotate(-30deg); }
          }
          @keyframes bounce-body {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-2px); }
          }
          .leg-f { animation: walk-leg-f 0.8s infinite ease-in-out; transform-origin: 12px 14px; }
          .leg-b { animation: walk-leg-b 0.8s infinite ease-in-out; transform-origin: 12px 14px; }
          .arm-f { animation: walk-arm-f 0.8s infinite ease-in-out; transform-origin: 12px 6px; }
          .arm-b { animation: walk-arm-b 0.8s infinite ease-in-out; transform-origin: 12px 6px; }
          .walker-body { animation: bounce-body 0.4s infinite ease-in-out; }
          
          @keyframes struggle-1 {
            0%, 100% { transform: rotate(15deg); }
            50% { transform: rotate(-15deg); }
          }
          @keyframes struggle-2 {
            0%, 100% { transform: rotate(-15deg); }
            50% { transform: rotate(15deg); }
          }
          .pull-leg-1 { animation: struggle-1 0.4s infinite ease-in-out; transform-origin: 12px 16px; }
          .pull-leg-2 { animation: struggle-2 0.4s infinite ease-in-out; transform-origin: 12px 16px; }
        `}</style>

        {/* The character pulling the screen down */}
        {CHARACTERS.map((char, index) => {
          if (index === 0) return null;
          return (
            <div key={`puller-${index}`} className={`pull-wrapper-${index} absolute left-1/2 -translate-x-1/2 z-[60] w-10 h-10 md:w-14 md:h-14 text-cream opacity-0 pointer-events-none`} style={{ top: "0%" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                {/* Hands on the boundary */}
                <path d="M8 0v3" />
                <path d="M16 0v3" />
                {/* Arms */}
                <path d="M8 3l4 4" />
                <path d="M16 3l-4 4" />
                {/* Head */}
                <circle cx="12" cy="9" r="2" />
                {/* Body */}
                <path d="M12 11v5" />
                {/* Legs struggling */}
                <path className="pull-leg-1" d="M12 16l-3 6" />
                <path className="pull-leg-2" d="M12 16l3 5" />
              </svg>
            </div>
          );
        })}

        {/* Premium Walking Character Scroll Progress */}
        <div className="absolute bottom-8 left-[10vw] right-[10vw] md:bottom-12 md:left-[20vw] md:right-[20vw] z-50 h-[2px] bg-cream/30 rounded-full pointer-events-none">
          {/* Progress fill */}
          <div 
            ref={progressFillRef}
            className="h-full bg-cream rounded-full origin-left scale-x-0"
          />
          
          {/* Walking Character */}
          <div 
            ref={characterRef}
            className="absolute bottom-0 -translate-x-1/2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            style={{ left: "0%" }}
          >
            <div className="walker-body w-8 h-8 md:w-10 md:h-10 text-cream">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <circle cx="12" cy="4" r="2" />
                <path d="M12 6v8" />
                <path className="arm-f" d="M12 6l3 5" />
                <path className="arm-b" d="M12 6l-3 5" />
                <path className="leg-f" d="M12 14l3 6" />
                <path className="leg-b" d="M12 14l-3 6" />
              </svg>
            </div>
          </div>

          <div className="absolute top-4 left-0 w-full flex justify-between text-[10px] md:text-xs font-hn text-cream/70 uppercase tracking-widest">
            <span>Start</span>
            <span>End</span>
          </div>
        </div>

        {CHARACTERS.map((char, index) => (
          <div 
            key={index} 
            className="character-panel absolute inset-0 w-full h-full overflow-hidden"
            style={{ zIndex: 1 }}
          >
            {/* Scrolling Marquee (Like Hero) */}
            <div className="bg-marquee absolute inset-x-0 top-[16vh] sm:top-[14vh] z-10 overflow-hidden pointer-events-none">
              <div className="flex w-max whitespace-nowrap font-serif font-bold uppercase text-[16vh] sm:text-[26vh] leading-none text-cream/40 marquee-track mix-blend-overlay">
                <span className="pr-[6vw]">{char.name} &mdash; {char.role}</span>
                <span className="pr-[6vw]">{char.name} &mdash; {char.role}</span>
              </div>
            </div>

            {/* Centered Image (Tombstone style to act like a cutout) */}
            <div className="char-img absolute bottom-0 left-1/2 -translate-x-1/2 w-[85vw] sm:w-[45vw] lg:w-[30vw] h-[75vh] md:h-[80vh] z-20 overflow-hidden rounded-t-[50vw] sm:rounded-t-[30vw] lg:rounded-t-[20vw] shadow-2xl">
              <Image 
                src={char.image} 
                alt={char.name} 
                fill
                priority={index === 0}
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover transition-all duration-700 ${char.imagePosition || 'object-center'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden pointer-events-none" />
            </div>
            
            {/* Overlay Text (Role & Description) */}
            <div className="text-group absolute bottom-12 left-6 md:bottom-24 md:left-[5vw] z-30 max-w-[80vw] md:max-w-[35vw] lg:max-w-[30vw] pointer-events-none">
              <span className="text-xs uppercase tracking-[0.2em] text-cream/70 mb-4 block mix-blend-difference">0{index + 1} / 05 &mdash; {char.role}</span>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-hn leading-[0.9] text-cream mb-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] break-words">
                {char.name}
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-cream/90 drop-shadow-md">
                {char.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
