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

  /* Callers pass an inline object ({ form_type: "..." }), which is a new
     identity on every render. Depending on it directly re-ran the effect,
     whose setState re-rendered the caller, which made a new object: an
     endless render loop on every page with an enquiry form. Keying on the
     serialised contents runs the effect only when the data really changes. */
  const additionalKey = JSON.stringify(additionalData ?? {});

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
    const finalData = { ...cleanedData, ...JSON.parse(additionalKey) };

    setSourceData(finalData); // eslint-disable-line react-hooks/set-state-in-effect
  }, [additionalKey]);

  return sourceData;
}
