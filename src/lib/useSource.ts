import { useEffect, useState } from "react";

interface SourceData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  source?: string;
  referrer?: string;
  landing_page?: string;
  [key: string]: unknown;
}

export function useSource(additionalData?: Record<string, unknown>) {
  const [sourceData, setSourceData] = useState<SourceData>({});

  useEffect(() => {
    // Get URL params
    const params = new URLSearchParams(window.location.search);

    // Extract UTM params
    const utmParams: SourceData = {
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
      utm_term: params.get("utm_term") || undefined,
      utm_content: params.get("utm_content") || undefined,
      source: params.get("source") || undefined,
      referrer: document.referrer || undefined,
      landing_page: window.location.href,
    };

    // Filter out undefined values
    const cleanedData = Object.fromEntries(
      Object.entries(utmParams).filter(([, value]) => value !== undefined),
    ) as SourceData;

    // Merge with additional data
    const finalData = { ...cleanedData, ...additionalData };

    setTimeout(() => {
      setSourceData(finalData);
    }, 0);
  }, [additionalData]);

  return sourceData;
}
