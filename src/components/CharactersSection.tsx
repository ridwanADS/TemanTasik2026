"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      }
    });

    // Make the first panel visible initially
    gsap.set(panels[0] as Element, { opacity: 1, zIndex: 10 });

    // Animate each panel in sequence
    panels.forEach((panel, i) => {
      if (i === 0) return; // Skip the first one as it's already visible
      
      // Animate background color of the section
      tl.to(sectionRef.current, {
        backgroundColor: CHARACTERS[i].bgColor,
        duration: 1,
        ease: "power2.inOut"
      }, "+=0.3");

      // Fade out previous panel
      tl.to(panels[i - 1] as Element, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
      }, "<");

      // Bring in the new panel
      tl.to(panel as Element, {
        opacity: 1,
        zIndex: 10 + i,
        duration: 1,
        ease: "power2.inOut"
      }, "<"); // Sync with background change
      
      // Parallax effect on the image inside the panel
      const img = (panel as Element).querySelector('.char-img');
      const textGroup = (panel as Element).querySelector('.text-group');
      const bgMarquee = (panel as Element).querySelector('.bg-marquee');
      
      if (img) {
        tl.fromTo(img, 
          { scale: 1.1, y: 50, filter: "blur(10px)" },
          { scale: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power2.out" },
          "<" // Sync with the panel fade
        );
      }
      
      if (textGroup) {
         tl.fromTo(textGroup,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "<0.2"
         )
      }

      if (bgMarquee) {
        tl.fromTo(bgMarquee,
          { y: -30, opacity: 0 },
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
        {CHARACTERS.map((char, index) => (
          <div 
            key={index} 
            className="character-panel absolute inset-0 w-full h-full opacity-0 overflow-hidden"
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
              <img 
                src={char.image} 
                alt={char.name} 
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${char.imagePosition || 'object-center'}`}
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
