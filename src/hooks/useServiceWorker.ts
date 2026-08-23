"use client";

import { useEffect } from "react";

/**
 * Registers the service worker at /sw.js.
 * Defers registration until the window load event to avoid competing
 * with the initial page load.
 */
export function useServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Silently ignore registration failures (e.g. localhost without HTTPS)
      });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register);
      return () => window.removeEventListener("load", register);
    }
  }, []);
}
