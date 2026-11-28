/**
 * AEVORYN SITE CONFIGURATION
 * Single source of truth for base URLs and site-wide metadata
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fix-facts-ssot.aevoryn-web.pages.dev";

export const SITE_NAME = "Aevoryn Services & Contracting Co.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/branding/aevoryn-og-share.png`;
