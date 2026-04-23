# MVP Roadmap

The MVP is developed over 12 weeks divided into 6 phases. Each phase produces
deliverable and integrable functionality, not isolated work.

---

## Phase 1 — Monorepo foundation `wk 1–2`

Goal: 100% functional development environment for all team members with a
single command.

- Initialize Turborepo + pnpm workspaces with 4 packages
- Set up local Supabase with `supabase start` (Docker)
- Apply SQL schema + seed: admin + 5 users + 30 test deals
- Configure NativeWind v5 for mobile and Tailwind CSS for web (shared tokens, separate components)
- Set up CI: GitHub Actions with lint + type-check + build on each PR
- Generate TypeScript types from local Supabase

**Deliverable**: `pnpm dev` starts web on :3000, Metro on :8081, and Supabase
Studio on :54323 with test data ready.

---

## Phase 2 — Design system and authentication `wk 3–4`

Goal: visual tokens defined and complete auth flow on web and mobile.

- Design temperature tokens: cold → blue (`#378ADD`), hot → red (`#D85A30`)
- Build `DealCard`, `CategoryBadge`, and `VoteButton` in `@hobbydeals/ui`
- Web auth: login/registration with magic link and OAuth Google
- Mobile auth: equivalent in Expo with deep links and `AsyncStorage`
- Route protection middleware in Next.js
- Onboarding screen: favorite hobbies selection

**Deliverable**: user can register, log in, and select their hobbies on web
and mobile.

---

## Phase 3 — Main feed and publishing `wk 5–7`

Goal: core platform functionality operational.

- Feed with infinite scroll and filters by category, temperature, and price
- Deal detail with real-time temperature (Supabase Realtime)
- Hot/cold voting system with optimistic updates and rollback
- Publishing form with Zod validation + moderation queue
- Comments with nested replies (1 level)
- Full-text search with `pg_trgm` and temperature ranking
- Category pages with visual header differentiated by hobby

**Deliverable**: user can browse the feed, vote, comment, search, and publish
a deal that enters the moderation queue.

---

## Phase 4 — User panel and alerts `wk 8–9`

Goal: personalized experience and user retention.

- Dashboard: published deals, saved deals, and recent activity
- Alerts by keyword + category + max price
- In-app notifications via Supabase Realtime
- Profile settings: avatar (Supabase Storage), bio, username
- Privacy settings and notification preferences
- Voting history and reputation system visible on profile

**Deliverable**: user receives a notification when a deal matching their alert
appears.

---

## Phase 5 — Admin panel `wk 10–11`

Goal: tools to manage the community and content quality.

- Admin dashboard: daily metrics, pending reports, average temperature
- Moderation queue: approve or reject deals with rejection reason
- User management: change role, ban with reason, adjust reputation
- Verified stores: verify merchants and manage affiliate URLs
- Content report review: resolve or dismiss
- Featured and sponsored: always visibly labeled

**Deliverable**: moderator can manage the entire pending content queue without
direct database access.

---

## Phase 6 — Polish and launch `wk 12`

Goal: production-ready, measurable, and maintainable.

- SEO: dynamic metadata, generated OG images, `sitemap.xml`
- Performance: green Core Web Vitals, lazy loading, image optimization
- Integration tests: vote, publish, search, alerts
- Deploy web on Vercel + Supabase Cloud (migrate from local)
- Build app with Expo EAS + submit to App Store and Google Play
- Sentry for error tracking + basic usage analytics

**Deliverable**: application in production with active monitoring.

---

## Post-MVP (backlog)

Identified features outside the initial MVP:

- Price history with scraper + price evolution chart
- Second-hand section between users (C2C)
- Push notifications (Expo Notifications + web push)
- AI price verification (detect if the "deal" is real)
- Own affiliate program for specialized stores
- Desktop app/browser extension to publish deals from any store
