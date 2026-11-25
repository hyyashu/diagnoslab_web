export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 18,
  full: 999,
} as const;

/** Semantic colours used across the app (supplement the Paper theme). */
export const colors = {
  /* Neutral tones readable on both the light and dark theme. */
  border: "rgba(128, 128, 128, 0.25)",
  textMuted: "#9CA3AF",

  // status palette (shared across visit, attendance, leads)
  status: {
    pending: "#6366f1",
    ongoing: "#f59e0b",
    completed: "#16a34a",
    cancelled: "#ef4444",
    info: "#0d9488",
  },
} as const;
