import { DIRECTIONS_HREF, MAP_EMBED_SRC } from "@/lib/contact";

/* The walk-in centres. Only Sakchi has an exact address and map pin in the
   repo; Jugsalai and Adityapur fall back to a Google Maps search until their
   listings are added. */

export type Centre = {
  name: string;
  /* Full address, for the area pages. */
  address: string;
  /* One short line, for lists of all centres. */
  shortAddress: string;
  /* What the centre offers, as a tag beside its name. */
  tag: string;
  hours: string;
  directionsHref: string;
  mapSrc: string;
};

const WALK_IN_HOURS = "Mon–Sun · 7:30 AM – 7:30 PM";

const search = (q: string) => ({
  directionsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`,
  mapSrc: `https://maps.google.com/maps?q=${encodeURIComponent(q)}&output=embed`,
});

export const sakchi: Centre = {
  name: "Diagnos Lab, Sakchi",
  address: "Ambagan, Sakchi, Jamshedpur, Jharkhand 831001",
  shortAddress: "Dhalbhum Road, near Union Bank, Ambagan",
  tag: "Main lab & radiology",
  hours: WALK_IN_HOURS,
  directionsHref: DIRECTIONS_HREF,
  mapSrc: MAP_EMBED_SRC,
};

export const jugsalai: Centre = {
  name: "Diagnos Lab, Jugsalai",
  address: "Jugsalai, Jamshedpur, Jharkhand 831006",
  shortAddress: "Jugsalai, Jamshedpur",
  tag: "Collection centre",
  hours: WALK_IN_HOURS,
  ...search("Diagnos Lab Jugsalai Jamshedpur"),
};

export const adityapur: Centre = {
  name: "Diagnos Lab, Adityapur",
  address: "Adityapur, Jamshedpur, Jharkhand",
  shortAddress: "Adityapur, Jamshedpur",
  tag: "Collection centre",
  hours: WALK_IN_HOURS,
  ...search("Diagnos Lab Adityapur Jamshedpur"),
};

export const allCentres = [sakchi, jugsalai, adityapur];
