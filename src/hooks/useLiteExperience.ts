"use client";

import { useEffect, useState } from "react";

export function useLiteExperience() {
  const [lite, setLite] = useState(true);

  useEffect(() => {
    const queries = [
      window.matchMedia("(max-width: 767px)"),
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
    ];

    const connection = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };

    const update = () => {
      const slowConnection =
        connection.connection?.saveData ||
        connection.connection?.effectiveType === "2g" ||
        connection.connection?.effectiveType === "slow-2g";

      setLite(queries.some((query) => query.matches) || Boolean(slowConnection));
    };

    update();
    queries.forEach((query) => query.addEventListener("change", update));

    return () => {
      queries.forEach((query) => query.removeEventListener("change", update));
    };
  }, []);

  return lite;
}
