# Velora Shop

Onlineshop für Padel-Zubehör (velorapadel.ch). Next.js App Router auf
Cloudflare (OpenNext), Cloudflare D1, Payrexx, Resend.

## Entwicklung

```bash
pnpm install
cp .env.example .dev.vars   # Secrets eintragen
pnpm dev                    # http://localhost:3000
pnpm check                  # lint + typecheck
```

## Cloudflare

```bash
pnpm cf:preview             # Build + lokaler Worker-Preview (wrangler)
pnpm cf:deploy              # Build + Deploy
wrangler d1 create velora-shop   # einmalig, ID in wrangler.jsonc eintragen
wrangler d1 migrations apply velora-shop --remote
```

Siehe `CLAUDE.md` für Architektur- und Design-Regeln.
