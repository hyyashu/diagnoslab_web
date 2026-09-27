"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { FileUp, Mic, Search } from "lucide-react";
import type { SearchEntry } from "@/app/search-index.json/route";
import { buttonClass } from "@/components/ui/button";
import { WHATSAPP_HREF } from "@/lib/contact";

/* One fetch per page view, shared by every search box on the page. */
let indexPromise: Promise<SearchEntry[]> | null = null;
const loadIndex = () =>
  (indexPromise ??= fetch("/search-index.json")
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => {
      indexPromise = null;
      return [];
    }));

const kindRank: Record<SearchEntry["k"], number> = { Scan: 0, Package: 1, Test: 2 };

function match(index: SearchEntry[], query: string): SearchEntry[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return index
    .filter((e) => {
      const title = e.t.toLowerCase();
      return words.every((w) => title.includes(w));
    })
    .sort((a, b) => {
      const aStarts = a.t.toLowerCase().startsWith(words[0]) ? 0 : 1;
      const bStarts = b.t.toLowerCase().startsWith(words[0]) ? 0 : 1;
      return aStarts - bStarts || kindRank[a.k] - kindRank[b.k] || a.t.localeCompare(b.t);
    })
    .slice(0, 6);
}

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
};
type SpeechWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognitionLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
};
const speechCtor = () =>
  (window as SpeechWindow).SpeechRecognition ??
  (window as SpeechWindow).webkitSpeechRecognition;
const noopSubscribe = () => () => {};

type SiteSearchProps = {
  /* "hero": the large desktop bar with mic, Rx and Search buttons.
     "header": the compact mobile field with an Rx pill. */
  variant: "hero" | "header";
};

export default function SiteSearch({ variant }: SiteSearchProps) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchEntry[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [listening, setListening] = useState(false);
  const canListen = useSyncExternalStore(noopSubscribe, () => !!speechCtor(), () => false);

  const results = match(index, query);
  const showList = open && query.trim().length > 0;

  const prime = () => {
    loadIndex().then(setIndex);
  };

  const go = (entry?: SearchEntry) => {
    setOpen(false);
    router.push(entry ? entry.h : "/tests/#tests-section");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const listen = () => {
    const Ctor = speechCtor();
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = "en-IN";
    rec.interimResults = false;
    rec.onresult = (e) => {
      const said = e.results[0]?.[0]?.transcript ?? "";
      setQuery(said);
      setOpen(true);
      setActive(0);
      prime();
    };
    rec.onend = () => setListening(false);
    setListening(true);
    rec.start();
  };

  const hero = variant === "hero";

  return (
    <form
      role="search"
      className="relative w-full"
      onSubmit={(e) => {
        e.preventDefault();
        go(results[active]);
      }}
    >
      <div
        className={
          hero
            ? "flex items-center gap-3 rounded-full border border-dl-line bg-white py-2 pl-6 pr-2 shadow-[0_12px_32px_rgba(22,24,29,0.08)]"
            : "flex items-center gap-2.5 rounded-full bg-dl-bg py-1.5 pl-4 pr-1.5"
        }
      >
        <Search className={`${hero ? "size-5" : "size-[18px]"} shrink-0 text-dl-muted`} aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => {
            prime();
            setOpen(true);
          }}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          placeholder={
            hero
              ? "Search for tests, packages, ultrasound, X-ray…"
              : "Search tests, packages, scans…"
          }
          aria-label="Search tests, packages and scans"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          className={`min-w-0 flex-1 bg-transparent text-dl-ink outline-none placeholder:text-dl-muted [&::-webkit-search-cancel-button]:hidden ${
            hero ? "text-[16.5px]" : "text-sm"
          }`}
        />

        {hero ? (
          <>
            {canListen && (
              <button
                type="button"
                onClick={listen}
                aria-label="Search by voice"
                className={`flex size-[42px] shrink-0 items-center justify-center rounded-full transition-colors ${
                  listening ? "bg-dl-red text-white" : "bg-dl-bg text-dl-ink-2 hover:bg-dl-red-soft"
                }`}
              >
                <Mic className="size-[18px]" aria-hidden />
              </button>
            )}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Send your prescription on WhatsApp"
              className="flex size-[42px] shrink-0 items-center justify-center rounded-full bg-dl-bg text-dl-ink-2 transition-colors hover:bg-dl-red-soft"
            >
              <FileUp className="size-[18px]" aria-hidden />
            </a>
            <button type="submit" className={buttonClass("primary", "lg")}>
              Search
            </button>
          </>
        ) : (
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send your prescription on WhatsApp"
            className="flex shrink-0 items-center gap-[5px] rounded-full bg-white px-3 py-2 text-[13px] font-bold text-dl-red"
          >
            <FileUp className="size-3.5" aria-hidden />
            Rx
          </a>
        )}
      </div>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-[120] mt-2 overflow-hidden rounded-2xl border border-dl-line bg-white py-1.5 shadow-[0_16px_40px_rgba(22,24,29,0.12)]"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-dl-muted">
              {index.length ? "No matches. Press Enter to browse all tests." : "Loading…"}
            </li>
          ) : (
            results.map((entry, i) => (
              <li
                key={entry.h}
                role="option"
                aria-selected={i === active}
                /* mousedown, not click: the input's blur would close the
                   list before a click registered. */
                onMouseDown={(e) => {
                  e.preventDefault();
                  go(entry);
                }}
                onMouseEnter={() => setActive(i)}
                className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 ${
                  i === active ? "bg-dl-bg" : ""
                }`}
              >
                <span className="min-w-0 truncate text-sm font-medium text-dl-ink">{entry.t}</span>
                <span className="flex shrink-0 items-center gap-2 text-xs text-dl-muted">
                  {entry.p > 0 && <span className="font-semibold text-dl-ink-2">₹{entry.p.toLocaleString("en-IN")}</span>}
                  <span className="rounded-md bg-dl-red-soft px-1.5 py-0.5 font-semibold text-dl-red">{entry.k}</span>
                </span>
              </li>
            ))
          )}
        </ul>
      )}
    </form>
  );
}
