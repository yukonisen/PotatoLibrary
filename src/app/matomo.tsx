"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackAppRouter } from "@socialgouv/matomo-next";

export function MatomoAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = "https://analytics.curiousers.org/";
    const siteId = "2";
    if (!url || !siteId) return;

    trackAppRouter({
      url,
      siteId,
      pathname,
      searchParams,
      debug: false,
    });
  }, [pathname, searchParams]);

  return null;
}
