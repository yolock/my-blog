"use client";

import { useState, useEffect } from "react";

export function useIntersection(selector: string, rootMargin = "-80px 0px -80% 0px") {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector, rootMargin]);

  return activeId;
}
