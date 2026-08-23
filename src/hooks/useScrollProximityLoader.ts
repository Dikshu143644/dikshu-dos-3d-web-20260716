"use client";

import { useEffect, useRef } from "react";

/**
 * Uses IntersectionObserver to detect when a section is within 1 viewport
 * of being visible, then triggers loading for the specified sequence IDs.
 *
 * Disconnects after triggering (loads once per sequence).
 *
 * @param elementRef - Ref to the DOM element to observe
 * @param sequenceIds - Array of sequence IDs to load when element is near viewport
 * @param triggerLoad - Function to start loading a sequence (must be idempotent)
 */
export function useScrollProximityLoader(
  elementRef: React.RefObject<HTMLElement | null>,
  sequenceIds: string[],
  triggerLoad: (sequenceId: string) => void
) {
  const triggeredRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || triggeredRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !triggeredRef.current) {
            triggeredRef.current = true;
            sequenceIds.forEach((id) => triggerLoad(id));
            observer.disconnect();
            break;
          }
        }
      },
      {
        // Trigger when within 1 viewport distance in any direction
        rootMargin: "100% 0px 100% 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
