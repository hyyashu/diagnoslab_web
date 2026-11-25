/* Contact points shown across the header, hero and footer. */
export const PHONE_E164 = "+918404802214";
export const PHONE_DISPLAY = "+91 84048 02214";
export const PHONE_HREF = `tel:${PHONE_E164}`;

/* WhatsApp is on its own number, separate from the call line. */
export const WHATSAPP_E164 = "+919031052505";
export const WHATSAPP_DISPLAY = "+91 90310 52505";
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_E164.slice(1)}`;
/* Opens the chat with a message already typed, so the team knows what
   the person wants before they reply. */
export const whatsappHref = (text: string) => `${WHATSAPP_HREF}?text=${encodeURIComponent(text)}`;

export const EMAIL = "info@diagnoslab.in";

/* The Sakchi lab's address, as on the Google Business Profile. Use these
   everywhere so the site, schema and listing never disagree. */
export const STREET_ADDRESS = "1st Floor, Building No. 142, Rishab Shanti Apartment, Dhalbhum Road, Ambagan, Sakchi";
export const ADDRESS_DISPLAY = `${STREET_ADDRESS}, Jamshedpur, Jharkhand 831001`;
export const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: STREET_ADDRESS,
  addressLocality: "Jamshedpur",
  addressRegion: "Jharkhand",
  postalCode: "831001",
  addressCountry: "IN",
};

/* Walk-in and phone hours, every day. */
export const HOURS_DISPLAY = "Mon–Sun, 7:30 AM – 7:30 PM";
/* Ultrasound needs the radiologist, who is not in on Sundays. */
export const ULTRASOUND_HOURS_DISPLAY = "Mon–Sat, 7:30 AM – 7:30 PM";

/* Localities right around the Sakchi lab, shown as "Near …". Add more as
   needed. */
export const NEARBY_AREAS = ["Sakchi", "Ambagan"];

/* Required by the PC-PNDT Act wherever pregnancy ultrasound is done. */
export const PCPNDT_NOTICE =
  "Sex determination of the foetus is not done here; it is punishable under the PC-PNDT Act, 1994.";

/* MedicalBusiness keeps the lab a LocalBusiness for Google; DiagnosticLab
   says what kind. */
export const BUSINESS_TYPE = ["MedicalBusiness", "DiagnosticLab"];

export const GOOGLE_REVIEWS_HREF =
  "https://www.google.com/maps/place/Diagnos+Lab/@22.8088744,86.2029601,17z/data=!4m8!3m7!1s0x39f5e3088f40bb2b:0x46180907852da273!8m2!3d22.8088744!4d86.2029601!9m1!1b1!16s%2Fg%2F1260h0qk1";

export const INSTAGRAM_HREF = "https://www.instagram.com/diagnoslab.in/";

export const DIRECTIONS_HREF =
  "https://www.google.com/maps/dir//1st+Floor+Building+No.142,+Diagnos+Lab,+Rishab+Shanti+Apartment,+Dhalbhum+Road,+above+Belgian+Waffle,+near+Union+Bank+of+India,+SNP+Area,+Ambagan,+Sakchi,+Jamshedpur,+Jharkhand+831001/@22.8075629,86.2029272,16.25z/data=!4m16!1m7!3m6!1s0x39f5e3088f40bb2b:0x46180907852da273!2sDiagnos+Lab!8m2!3d22.8088744!4d86.2029601!16s%2Fg%2F1260h0qk1!4m7!1m0!1m5!1m1!1s0x39f5e3088f40bb2b:0x46180907852da273!2m2!1d86.2029601!2d22.8088744!17m2!4m1!1e3!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D/";

export const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.86435722095376!2d86.2028780830967!3d22.808772796468762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e3088f40bb2b%3A0x46180907852da273!2sDiagnos%20Lab!5e0!3m2!1sen!2sin!4v1772863062022!5m2!1sen!2sin";
