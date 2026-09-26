"use client";

import { useEffect, useState } from "react";

export interface CyclingWordProps {
  words: string[];
}

const CYCLE_INTERVAL_MS = 2500;
const LETTER_STAGGER_MS = 50;

export default function CyclingWord({ words }: CyclingWordProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, CYCLE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [words.length]);

  const word = words[index];
  const longestWord = words.reduce((a, b) => (b.length > a.length ? b : a));

  // The invisible longest word reserves the width, so the heading never re-wraps between words.
  return (
    <span aria-hidden="true" className="inline-grid">
      <span className="invisible col-start-1 row-start-1">{longestWord}</span>
      <span key={index} className="col-start-1 row-start-1">
        {[...word].map((letter, letterIndex) => (
          <span
            key={letterIndex}
            style={{ animationDelay: `${letterIndex * LETTER_STAGGER_MS}ms` }}
            className="animate-char-in inline-block"
          >
            {letter}
          </span>
        ))}
      </span>
    </span>
  );
}
