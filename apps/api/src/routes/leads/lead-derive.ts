/* Works out the structured lead fields from what the website (or staff
   app) sent in `source`. Used when a lead is saved and by the one-time
   backfill (scripts/backfill-leads.ts), so old and new leads agree. */

export type LeadChannel =
  | 'google_ads'
  | 'meta_ads'
  | 'google_search'
  | 'other_search'
  | 'social'
  | 'referral'
  | 'direct'
  | 'whatsapp'
  | 'phone'
  | 'walk_in'
  | 'other';

type Source = Record<string, unknown> | null | undefined;

const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : null);
const int = (v: unknown) => {
  const n = typeof v === 'number' ? v : typeof v === 'string' ? Number(v.replace(/[^\d.]/g, '')) : NaN;
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
};
const asObject = (s: unknown): Source => (s && typeof s === 'object' && !Array.isArray(s) ? (s as Record<string, unknown>) : null);

/* Indian mobile numbers to +91XXXXXXXXXX; anything else that looks like
   an international number keeps its digits; junk returns null. */
export function normalizePhone(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, '');
  if (/^[6-9]\d{9}$/.test(digits)) return `+91${digits}`;
  if (/^0[6-9]\d{9}$/.test(digits)) return `+91${digits.slice(1)}`;
  if (/^91[6-9]\d{9}$/.test(digits)) return `+${digits}`;
  if (raw.trim().startsWith('+') && digits.length >= 10 && digits.length <= 15) return `+${digits}`;
  return null;
}

/* Staff app "Source" choices. */
const staffChannels: Record<string, LeadChannel> = {
  'walk-in': 'walk_in',
  'phone call': 'phone',
  whatsapp: 'whatsapp',
  referral: 'referral',
  website: 'direct',
};

const META_SOURCES = /^(fb|facebook|ig|instagram|an|msg|meta|messenger)$/i;
const PAID_MEDIUM = /^(paid|cpc|ppc|paidsocial|paid_social|display|cpm)$/i;

function host(url: string | null) {
  if (!url) return null;
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function path(url: string | null) {
  if (!url) return null;
  try {
    const u = new URL(url, 'https://diagnoslab.in');
    return u.pathname + u.search;
  } catch {
    return url;
  }
}

export function deriveAttribution(raw: unknown) {
  const s = asObject(raw) ?? {};
  const utmSource = str(s.utm_source);
  const utmMedium = str(s.utm_medium);
  const landingPage = path(str(s.landing_page));
  const ref = host(str(s.referrer));

  let clickId: string | null = null;
  let clickIdType: string | null = null;
  for (const k of ['gclid', 'gbraid', 'wbraid', 'fbclid']) {
    if (str(s[k])) {
      clickId = str(s[k]);
      clickIdType = k;
      break;
    }
  }

  const paidMedium = !!utmMedium && PAID_MEDIUM.test(utmMedium);
  let channel: LeadChannel = 'other';

  const staff = str(s.channel)?.toLowerCase();
  if (staff && staffChannels[staff]) channel = staffChannels[staff];
  else if (clickIdType && clickIdType !== 'fbclid') channel = 'google_ads';
  else if (paidMedium && utmSource && META_SOURCES.test(utmSource)) channel = 'meta_ads';
  else if (paidMedium && utmSource && /google|adwords/i.test(utmSource)) channel = 'google_ads';
  else if (landingPage?.startsWith('/lp/')) channel = 'google_ads'; // paid landing pages
  else if (utmSource && /chatgpt|perplexity|gemini|copilot|claude/i.test(utmSource) && !/test/i.test(utmSource)) channel = 'other_search';
  else if (utmSource && /test/i.test(utmSource)) channel = 'other';
  else if (ref === 'tagassistant.google.com') channel = 'other'; // Google Tag Assistant test visits
  else if (ref && /(^|\.)google\./.test(ref)) channel = 'google_search';
  else if (ref && /(bing|yahoo|duckduckgo|ecosia|yandex|chatgpt|perplexity)\./.test(ref)) channel = 'other_search';
  else if (ref && /(^|\.)(wl\.co|wa\.me|whatsapp\.com)$/.test(ref)) channel = 'whatsapp';
  else if (ref && /(facebook|instagram|fb\.com|t\.co|x\.com|twitter|linkedin|youtube)/.test(ref)) channel = 'social';
  else if (utmSource && META_SOURCES.test(utmSource)) channel = 'social';
  else if (ref && /(^|\.)diagnoslab\.in$/.test(ref)) channel = 'direct';
  else if (ref) channel = 'referral';
  else if (Object.keys(s).length) channel = 'direct';

  return {
    channel,
    isPaid: channel === 'google_ads' || channel === 'meta_ads' || paidMedium,
    campaign: str(s.utm_campaign),
    keyword: str(s.utm_term),
    landingPage,
    clickId,
    clickIdType,
  };
}

export function deriveInterest(raw: unknown) {
  const s = asObject(raw) ?? {};
  const test = str(s.test_name) ?? str(s.testName);
  if (test) return { interestKind: 'test' as const, interestName: test, interestPrice: int(s.test_price) };
  const pkg = str(s.package_name);
  if (pkg) return { interestKind: 'package' as const, interestName: pkg, interestPrice: int(s.package_price) };
  const scan = str(s.radiology_name);
  if (scan) return { interestKind: 'scan' as const, interestName: scan, interestPrice: null };
  const topic = str(s.contact_topic);
  if (topic) return { interestKind: 'general' as const, interestName: topic, interestPrice: null };
  return { interestKind: null, interestName: null, interestPrice: null };
}
