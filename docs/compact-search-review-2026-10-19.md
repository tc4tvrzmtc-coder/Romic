# Compact search proposal — review only

Status: prepared for review; do not deploy this proposal until the user approves its appearance and copy. Main remains on the previous published version.

## Reference observations

Live desktop browser observations on 19 October 2026:

- https://www.boujee.online/ — a dedicated search drawer, independent from collection filters; entering `monte` produced seven product suggestions and one collection suggestion below the input. Its full-height drawer is not copied: ROMIC's user explicitly wants a small search surface.
- https://baggu.com/ — the search icon opens a dedicated dialog with one text input and popular-query choices. No price sort or collection category controls appeared in that dialog.

Reviewed guidance: Vercel Web Design Guidelines / Web Interface Guidelines, and Addy Osmani's accessibility skill. Applied principles: one task per surface, native buttons/dialog, labelled input and close action, native focus containment and Escape, accessible results, 16px mobile input, 44px close target, bounded results height, no page scroll to open search.

## Proposed behavior

- The header icon opens a compact native dialog, maximum 400px wide and about 290px tall with results. It works from home and product pages.
- One input only; results appear below with thumbnail, name, current price, and product link. Up to three rows are visible, with internal scrolling for additional matches.
- No category or price controls in search. Enter opens the first result; Arrow Down enters the result links. Native Tab and Escape remain available.
- Search does not filter or move the catalogue. Its dialog blocks background interaction and page scrolling while open.
- Collection filtering remains a separate local control.
- Search supports product names, descriptions, Hebrew aliases, multiple words, and empty/no-match states.

## Copy for approval

| Current | Proposed | Reason |
| --- | --- | --- |
| מומלצים | סדר הקולקציה | Restores the curated catalogue order; no recommendation algorithm exists. |
| Featured | Collection order | Same behavior in English. |

New functional labels: `סגירת החיפוש` / `Close search`, and a result count. Existing product descriptions remain unchanged.

## Verification

13 Node tests passed, including Hebrew/English matching and multiword search. Syntax checks passed. Full build and validation of 60 HTML / 48 product pages passed.

The proposed dialog has not been rendered in a live browser or tested on an actual iPhone. The in-conversation preview is a design prototype with three sample products, not evidence of full-site QA. No production deployment is authorized by this report.
