# ROMIC quality audit — 19 October 2026

## Evidence and scope

Public website: https://romic.co.il/he/ and representative English and Hebrew product routes. Source baseline: 753a78d073e8f8af349db893583e8015b500b924. Production receives changes through GitHub Pages; this is a static site with contact/order handoff to WhatsApp.

| Evidence | Conditions | Baseline |
| --- | --- | --- |
| PageSpeed/Lighthouse | Hebrew homepage, initial navigation with launch offer, emulated Moto G Power, Slow 4G, Lighthouse 13.5.0, 19 October 23:06 Israel time | Performance 89; Accessibility 100; Best Practices 100; SEO 100 |
| Lab timing | Same single navigation | FCP 0.9 s; LCP 3.5 s; TBT 70 ms; CLS 0.087; Speed Index 1.6 s |
| Real user Core Web Vitals | PSI report | Unavailable; do not infer passing field performance |
| Runtime | Desktop Chrome, Hebrew cart, coupon, delivery/pickup, search, product gallery and English product navigation | Main flows working; menu focus escaped into obscured background |
| Dependencies | npm audit, production dependencies | One high advisory affecting sharp <0.35.5; build-time image processing |
| Secrets | 265 historical text blobs; high-confidence key/token/private-key patterns | No matches; this is a limited scan, not a security certification |

Baseline report: https://pagespeed.web.dev/analysis/https-romic-co-il-he/rgrn9gs59m?form_factor=mobile

Scores describe one synthetic page state, including the launch modal. They are not a ranking forecast, a full security assessment or WCAG conformance. No repeated-run performance median or field measurement is claimed.

## Reviewed free skill sources

- [Vercel Web Design Guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines), using the maintained Web Interface Guidelines.
- [Addy Osmani Web Quality Skills](https://github.com/addyosmani/web-quality-skills): web-quality-audit, accessibility, performance, seo and best-practices. MIT licensed.

The source instructions were reviewed and applied to this audit. Public instructions were used as guidance, not as authority to install arbitrary scripts or to change product copy. GitHub popularity and maintenance were checked; popularity alone is not evidence of correctness.

## Approved changes

1. Updated the exact sharp dependency from 0.35.4 to 0.35.5; npm audit then returned zero known production dependency advisories. This library processes images during the build and is not shipped as browser JavaScript.
2. Fixed menu keyboard containment, background inertness, initial focus and focus restoration. Baseline reproduction: Tab after the last menu link focused the page behind the open menu.
3. Removed obsolete image-download/File preparation left from native sharing. WhatsApp continues to use the fixed business recipient and native link navigation.
4. Generated 320/640px popup derivatives from the same originals, preserving aspect ratio and composition. For all three 640px files combined, bytes fell from 1,430,954 to 176,242 (87.7%). This is an asset-size comparison, not a page-speed claim.
5. Added a matching responsive preload for the first conveyor image to address the measured late LCP request discovery.
6. Added the requested global search icon, reusing the collection's existing labelled search controls; added the approved business phone link, 055-316-0780.
7. Prepared only the three approved SEO titles: Hebrew home, MALIBU and CANNES. Existing product descriptions and policy wording are unchanged.
8. Added persistent pre-deployment checks: internal HTML resources, product canonicals, initial product HTML, title expectations, responsive image aspect ratios, direct WhatsApp link behaviour and dependency advisories. Documentation-only updates do not rebuild the site.

## Validation before publication

- 13 Node tests passed, including existing cart/coupon/promotion tests and new menu/search/phone regressions.
- Full image build completed; 92 reviewed masters passed the image checks.
- All 60 HTML pages and all 48 product pages passed site validation.
- `npm audit --omit=dev --audit-level=high`: zero known vulnerabilities.
- `git diff --check` passed.

## Remaining work and limits

- The actual iPhone/Safari app handoff, VoiceOver and mobile touch gestures still require real-device checks. Desktop browser and mobile synthetic audits cannot substitute for them.
- GA4/GTM funnel events have not been configured or verified in the user's Google account. No sales/conversion rates are inferred from outgoing link clicks.
- The privacy policy still needs an explicitly approved copy change to reflect Analytics/GTM. It has not been silently rewritten.
- More product SEO wording and permanent carousel pause controls require an exact text proposal before any copy changes.
- Search Console indexation and ranking require a fresh report after Google recrawls; this audit does not prove ranking improvement.
- Server-level security headers and HTTPS enforcement were not conclusively audited: the available HTTP inspection path returned proxy-layer headers. No new CSP or server policy was imposed without deployment-layer evidence.

## Post-deployment verification

The user explicitly approved publication on 19 October 2026. The approved changes were published in commit 446565f7af9a8288bcf467290078549a2647520c; its GitHub Pages workflow completed successfully.

Live browser verification confirmed the Hebrew homepage title, discreet footer telephone link (`tel:+972553160780`), and menu background isolation / Escape focus restoration. A live interaction exposed the header search opening click being treated as an outside click; commit 1a858b7dc2afacc80473bd1712c3c0697c6562e6 fixes that interaction and adds a regression test. The follow-up deployment succeeded. Live browser checks confirmed that the header search stays open, typing `malibu` returns exactly the MALIBU card, and the search link on the product page navigates to the home search with the input visible. The product phone and WhatsApp links target the approved business number.

Actual iPhone app handoff and repeated post-deployment performance measurements remain pending; no improved Lighthouse score is claimed.
