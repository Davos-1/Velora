import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * The catalogue is fully static (SSG). Prerendered pages are read from the
 * static assets bundle – no KV/R2 needed. Switch to kvIncrementalCache if
 * ISR/revalidation is ever introduced.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
