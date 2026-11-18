# ROMIC approved design integration — 18 November 2026

Review branch: `ux/approved-black-friday-review`. This branch does not replace the production deployment. Final iPhone review precedes publication to romic.co.il.

## Changes

- Beige campaign with the original pink CLOUD NINE model photo, full face and bag visible, Cormorant Garamond display typography, Assistant Hebrew, compact original wordmark and mauve action buttons. Font license included.
- Five CLOUD NINE colour cards point to one canonical product and explicit selected colours. All 25 existing catalog models remain; expanded catalog has 29 cards.
- Real bag photos in circular colour selectors. In-place colour changes retain the selected gallery view and keyboard focus, update the URL, selected colour and both purchase buttons.
- Fixed 4:5 image frame with contain rendering, independent of viewport height and source aspect ratio. Original photos are not cropped or redrawn. Thumbnail, arrow, keyboard, touch and image-enlargement controls.
- Mobile product heading, description and price precede gallery. Fixed purchase bar; duplicate floating bag hidden on mobile home/product pages to prevent covering primary actions.
- CLOUD NINE description is a handmade crochet clutch with a silver-tone chain. Body dimensions 23 × 14 × 8 cm. Regular ₪350, campaign ₪280.
- Automatic 20% including custom designs, alternative BLACK20 without stacking, existing higher personal offer retained. Campaign ends at Israel midnight on 1 December. Delivery ₪30, free over ₪500 after discounts; free pickup and seven business day supply time preserved.
- Both languages retain complete catalog, finder, filters/sort, global search, customizer, persistent bag, WhatsApp ordering and legal links.

## Verification

- 28 Node tests passed, including independent variant routes and expansion without losing any catalog model; original catalog/search/finder/navigation/image and purchase tests retained.
- Browser: 60 colour/photo combinations = 5 colours × 3 photos × widths 320/375/390/430. Every measured frame maintained 4:5 and every state had no horizontal document overflow.
- Browser English home: all four widths had no horizontal overflow; campaign CTA bottom was within the simulated 812px content viewport. This is not a physical Safari viewport claim.
- Browser: expanded catalog 29 cards, five CLOUD NINE cards; clutch filtering and CLOUD NINE global search returned appropriate results.
- Browser English purchase: two colours retained in bag, ₪700 original subtotal, ₪140 discount, final ₪560 with free delivery eligibility. Applying BLACK20 retained ₪560. WhatsApp URL matched the items/colours and total; no message, order or payment submitted.
- Browser: image enlargement opened and Escape dismissed it. Desktop Hebrew hero displayed the original model photograph without crop.
- Image build: 107 reviewed masters; originals preserved. Site integrity: 50 product pages with resource/canonical checks. Final gate results recorded in the PR.
- Production dependency audit: zero reported vulnerabilities.

## Remaining acceptance

Physical iPhone Safari: scroll while its browser bars expand/collapse; switch all three gallery photos and colours; check touch swipe and safe-area purchase bar. Desktop responsive Chrome does not certify these device behaviours. Final visual review by Amir and Romi and deployment to romic.co.il remain pending.

The separate review hosting disables analytics and search indexing. Production analytics configuration and source photographs remain unchanged.

## Follow-up: natural campaign imagery

The original model portrait now sits on one continuous photographic surface with the campaign copy. Backdrop tones follow the photograph; narrow edge masks blend its background into the surrounding page without cropping the face or bag or altering the source file. The bottom transition joins the paper background of the collection rather than ending at a separate rectangular tile. The editorial caption inside the photograph was removed.

Product galleries keep their stable 4:5 geometry. The build now samples the corners of each reviewed master to supply the reserved frame background, so portrait photographs receive a related backdrop instead of unrelated beige side bars. A pipeline regression assertion checks this palette against a known scene and continues to verify untouched original files.

Follow-up QA: all 15 CLOUD NINE colour/photo states retain 4:5 geometry, use an opaque photo-derived frame background, and have no horizontal overflow. Changing the simulated mobile viewport height 812 → 640 → 812 leaves the gallery exactly 335 × 418.75 px at the tested width. Hebrew and English hero checks at 320/375/390/430 retain the original photograph's aspect ratio and keep the campaign action within an 812px content viewport. These are responsive Chrome checks; physical Safari acceptance remains pending.
