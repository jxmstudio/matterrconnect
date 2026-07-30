/**
 * Qualifications and certifications, exactly as supplied by the client.
 *
 * ⚠️ LOGOS: the proposal promises the Licensed Building Practitioner, St John
 * and Site Safe marks in the footer. Those are third-party trademarks and we
 * do not have the official asset files. `logo` stays null until the real files
 * are supplied — see README for where to request each one. Until then the
 * TrustBadges component renders these as text, which is accurate and carries
 * most of the trust value anyway.
 */

export type Qualification = {
  name: string;
  /** Short label for the compact footer/trust strip. */
  short: string;
  detail: string;
  /** Path under /public once the official mark is supplied. */
  logo: string | null;
};

export const qualifications: Qualification[] = [
  {
    name: "Licensed Building Practitioner",
    short: "LBP Licensed",
    detail:
      "Licensed to carry out and supervise restricted building work — the structural and weathertightness elements that legally require a licensed practitioner.",
    logo: null,
  },
  {
    name: "Qualified Builders",
    short: "Qualified Builders",
    detail:
      "A full trade qualification in carpentry — the complete certificate, not a partial or in-progress one.",
    logo: null,
  },
  {
    name: "Site Safe Construction Certified",
    short: "Site Safe Certified",
    detail:
      "Current Site Safe construction certification, so we can work to main contractor health and safety requirements on commercial sites.",
    logo: null,
  },
  {
    name: "St John First Aid Certified",
    short: "First Aid Certified",
    detail: "Current St John first aid certification on site.",
    logo: null,
  },
];
