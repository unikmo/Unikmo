'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * Rotating Times Square hero.
 *
 * The slide list is explicit. Previously this component probed for ts-5..ts-8
 * in three formats, which produced about 12 failed (404) image requests on
 * every page load. To add a slide, put the file in /public/curated/ and add
 * its path here.
 */
const SLIDES = [
  '/curated/ts-love.webp',
  '/curated/ts-newlywed.webp',
  '/curated/ts-proposal.webp',
  '/curated/ts-ny.webp',
];
const INTERVAL_MS = 4500;

export default function TimesSquareRotator({
  className = '',
  alt = 'A curated UNIKMO memory on a Times Square billboard',
}: {
  className?: string;
  alt?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((n) => (n + 1) % SLIDES.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === index ? alt : ''}
          aria-hidden={i !== index}
          fill
          priority={i === 0}
          sizes="(max-width:1024px) 100vw, 52vw"
          className={`object-cover transition-opacity duration-[1200ms] ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-[#17232A]/20 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden="true">
        {SLIDES.map((src, i) => (
          <span
            key={src}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-white/90' : 'w-1.5 bg-white/45'}`}
          />
        ))}
      </div>
    </div>
  );
}
