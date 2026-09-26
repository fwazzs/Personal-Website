"use client";

import { useCallback, useRef, useState } from "react";

import { navLinks } from "@/data/content";

import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Following a link lets the browser move focus to the target section, so don't pull it back.
  const closeMenuAfterNavigate = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20 flex h-16 items-center justify-end px-6 md:h-20 md:justify-center md:px-20">
        <nav aria-label="Primary" className="hidden gap-12 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative px-1.5 py-3 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {link.label}
              <span className="absolute inset-x-1.5 bottom-2 h-px origin-left scale-x-0 bg-fg transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="flex size-11 items-center justify-center rounded-xl text-fg md:hidden"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 8h16" />
            <path d="M4 16h16" />
          </svg>
        </button>
      </header>
      <MobileMenu
        open={isMenuOpen}
        onClose={closeMenu}
        onNavigate={closeMenuAfterNavigate}
        links={navLinks}
      />
    </>
  );
}
