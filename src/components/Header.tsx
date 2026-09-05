"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = ["Profiles", "Gallery", "Message"];
  const socialLinks = ["Instagram", "TikTok", "YouTube"];

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8 anim-fade-up" style={{ animationDelay: "900ms" }}>
        {/* Brand */}
        <Link href="/" className="font-hn text-lg tracking-wide anim-fade-up" style={{ animationDelay: "800ms" }}>
          The Gang
        </Link>

        {/* Desktop Right Cluster */}
        <div className="hidden sm:flex items-start gap-16 lg:gap-24">
          <span className="text-sm">2025</span>
          
          <nav className="flex flex-col gap-0.5 text-sm">
            {navLinks.map((link, i) => (
              <Link 
                key={link} 
                href="#" 
                className="hover:opacity-60 transition-opacity duration-300 anim-fade-up"
                style={{ animationDelay: `${1000 + i * 80}ms` }}
              >
                {link}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-0.5 text-sm">
            {socialLinks.map((link, i) => (
              <Link 
                key={link} 
                href="#" 
                className="hover:opacity-60 transition-opacity duration-300 anim-fade-up"
                style={{ animationDelay: `${1150 + i * 80}ms` }}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="sm:hidden flex flex-col justify-center items-center h-10 w-10 gap-1.5 z-50 relative"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <div className={`h-0.5 w-6 bg-cream transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'rotate-45 translate-y-2 opacity-0' : ''}`} />
          <div className={`h-0.5 w-6 bg-cream transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`h-0.5 w-6 bg-cream transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? '-rotate-45 -translate-y-2 opacity-0' : ''}`} />
        </button>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 sm:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 bottom-0 z-40 w-[80%] max-w-sm bg-[#141414] px-8 py-10 transition-transform duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] sm:hidden flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button 
          onClick={() => setIsOpen(false)}
          className={`absolute right-6 top-6 transition-all duration-300 delay-300 ${isOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}
        >
          <X size={26} strokeWidth={1.5} className="text-cream" />
        </button>

        <div className="mt-16 flex flex-col gap-12">
          <div>
            <p className={`text-cream/50 text-xs uppercase tracking-[0.2em] mb-6 transition-all duration-500 delay-250 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              Site Index
            </p>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <Link 
                  key={link} 
                  href="#" 
                  className={`text-4xl font-hn transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                  style={{ transitionDelay: isOpen ? `${300 + i * 80}ms` : '0ms' }}
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className={`text-cream/50 text-xs uppercase tracking-[0.2em] mb-6 transition-all duration-500 delay-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              Find Me
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {socialLinks.map((link, i) => (
                <Link 
                  key={link} 
                  href="#" 
                  className={`text-sm transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                  style={{ transitionDelay: isOpen ? `${550 + i * 60}ms` : '0ms' }}
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
