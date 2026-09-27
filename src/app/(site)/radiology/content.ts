import type { ScanService } from "@/components/cards/scanCard";

/* Radiology page copy from DL.pen. Some lines are worded shorter on phones. */

export const scanServices: ScanService[] = [
  {
    id: "ultrasound",
    title: "Ultrasound (USG)",
    image: "/images/radiology/USG.avif",
    icon: "scan-line",
    reportingTime: "1–2 hours",
    description:
      "Safe imaging using sound waves to examine internal organs. Performed by experienced doctors, with a female radiologist available for female patients.",
    mobileDescription:
      "Safe imaging using sound waves to examine internal organs. A female radiologist is available for female patients.",
    usedFor: ["Abdomen scans", "Pelvic scans", "Pregnancy scans", "Kidney & liver evaluation"],
    href: "/ultrasound-in-jamshedpur/",
    femaleRadiologist: true,
  },
  {
    id: "ecg",
    title: "ECG",
    image: "/images/radiology/ECG.avif",
    icon: "heart-pulse",
    reportingTime: "1–2 hours",
    description: "Quick test to check heart rhythm and electrical activity.",
    mobileDescription: "Heart rhythm & electrical activity",
    usedFor: ["Chest pain", "Irregular heartbeat", "Pre-surgery fitness", "Routine cardiac screening"],
    mobileUsedFor: "Chest pain · Irregular heartbeat",
    href: "/ecg/",
  },
  {
    id: "xray",
    title: "X-Ray",
    image: "/images/radiology/XRAY.avif",
    icon: "bone",
    reportingTime: "1–2 hours",
    description: "Fast, low-radiation imaging for bones, chest, spine, joints and more.",
    mobileDescription: "Low-radiation imaging for bones & chest",
    usedFor: ["Fractures", "Chest infections", "Back pain", "Joint problems"],
    mobileUsedFor: "Fractures · Chest infections",
    href: "/xray/",
  },
  {
    id: "echo",
    title: "2D ECHO",
    image: "/images/radiology/USG.avif",
    icon: "activity",
    reportingTime: "1–2 hours",
    description: "Ultrasound of the heart to check valves and cardiac function.",
    mobileDescription: "Live ultrasound images of the heart",
    usedFor: ["Heart valve problems", "Cardiac function", "Pre-surgery evaluation", "Chest pain"],
    mobileUsedFor: "Valve problems · Cardiac function",
  },
  {
    id: "pft",
    title: "PFT",
    image: "/images/radiology/PFT.avif",
    icon: "wind",
    reportingTime: "1–2 hours",
    description: "A breathing test to evaluate lung capacity and airflow.",
    mobileDescription: "Breathing test for lung capacity",
    usedFor: ["Asthma", "Chronic cough", "Breathlessness", "Pre-surgery lung check"],
    mobileUsedFor: "Asthma · Chronic cough",
  },
];

export const whyPoints = [
  {
    icon: "monitor",
    title: "Modern digital equipment",
    text: "High-resolution imaging with the latest diagnostic technology.",
    mobileText: "High-resolution imaging with the latest technology.",
  },
  {
    icon: "users",
    title: "Experienced specialists",
    text: "Qualified radiologists and technicians with years of expertise.",
    mobileText: "Qualified radiologists and technicians.",
  },
  {
    icon: "user-round-check",
    title: "Female radiologist",
    text: "Dedicated female radiologist available for female patients.",
    mobileText: "Available for female patients.",
    highlight: true,
  },
  {
    icon: "clock-3",
    title: "Reports in 1–2 hours",
    text: "Fast turnaround so you and your doctor can act quickly.",
    mobileText: "So you and your doctor can act quickly.",
  },
  {
    icon: "file-check",
    title: "Clear, accurate reports",
    text: "Detailed digital reports on WhatsApp and email.",
    mobileText: "Digital reports on WhatsApp and email.",
  },
];
