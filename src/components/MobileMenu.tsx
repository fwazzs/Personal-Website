"use client";

import { useEffect, useRef } from "react";

import type { NavLink } from "@/data/content";

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onNavigate: () => void;
  links: NavLink[];
}

export default function MobileMenu({ open, onClose, onNavigate, links }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-30 flex flex-col bg-bg"
    >
      <div className="flex h-16 items-center justify-end px-6">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex size-11 items-center justify-center rounded-xl text-fg"
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
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
      <nav aria-label="Primary" className="flex flex-1 flex-col items-start justify-center gap-6 px-6">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className="font-serif text-4xl text-fg"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
