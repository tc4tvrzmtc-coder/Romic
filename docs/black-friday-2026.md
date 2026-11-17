# ROMIC Black Friday / CLOUD NINE

## Campaign

- Automatic 20% sitewide, including custom designs, from 18 November 2026 at 00:00 through 30 November 2026 at 23:59:59 Israel time.
- BLACK20 is an alternative to the automatic discount. It never compounds. Existing higher personal offers replace the campaign discount.
- Delivery is ₪30; orders over ₪500 after discounts receive free delivery. Pickup remains free.
- Black editorial homepage, compact rotating announcement bar, no new popup.

## CLOUD NINE

One catalog model with black, white, beige, sage green and pink variants. Regular ₪350, campaign ₪280. Bag body 23 × 14 × 8 cm. Each colour provides a front, worn and interior photograph. Variant names and image follow through the persistent bag, language changes and WhatsApp message. Product routes retain a canonical model URL.

All 15 added source JPEGs are byte-for-byte copies of the supplied photographs, renamed for stable URLs. No logo, bag, colour, texture or chain pixels are generated. Existing source assets are unchanged. Full scenes are explicitly preserved by the existing reviewed image pipeline; responsive derivatives use normal resizing and compression.

## Verification

27 Node tests cover existing catalogue/search/finder/navigation/image/purchase behaviour and new Black Friday dates, no stacking, custom prices, five variant images, persistent selections, post-discount shipping threshold, pickup and WhatsApp total agreement in both languages.

The build validates reviewed master images, derivatives, local resources, product pages, canonical URLs and sitemap coverage. npm production dependency audit reports zero vulnerabilities.

Browser checks include Hebrew desktop homepage and product, pink selection, automatic and BLACK20 pricing, and 375px homepage. A mobile title overflow found during QA was corrected before deployment. Further final checks are recorded below.

The existing WhatsApp-based ordering process remains in place. No payment or real order is submitted during QA. Touch swipe is implemented but requires a physical touch-device acceptance check; desktop browser QA cannot certify device gestures.

## Final deployment and acceptance results

Production source commit: `304dd2393eb750b24746e363c60a0c77f04d718a`. The uploaded Git tree exactly matched the locally tested tree (`e47c0bf3547f1d3afd527fe95a741d683f24ad7e`).

GitHub Actions deployment [44194231899](https://github.com/tc4tvrzmtc-coder/Romic/actions/runs/44194231899) completed successfully. All build, image validation, site integrity, test and audit gates passed. Final output: 62 HTML pages, 50 product pages, 107 reviewed image masters, zero known production dependency vulnerabilities.

Verified live at https://romic.co.il/he/: Black Friday banner, black CLOUD NINE hero, automatic 20% prices and custom-design discount. Verified the live CLOUD NINE white variant, correct 23 × 14 × 8 cm dimensions, ₪280 bag total, selected colour in WhatsApp, and English switching retaining the white selection. Removed the test selection afterwards; no order/message/payment submitted.

Responsive browser QA at 375px covered both languages, homepage, product gallery and two-colour cart. Two CLOUD NINE colours total ₪560 and delivery is free; BLACK20 leaves the total unchanged. Physical iPhone gesture testing remains outside the browser verification performed here.
