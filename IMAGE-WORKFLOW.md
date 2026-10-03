# Romic product image standard

Every published product/gallery and customizer image is WebP on a 1200 × 1500 canvas (4:5). Responsive versions use the same ratio. Original photographs remain unchanged in `site/assets`.

Primary catalogue images and every active customizer image require a reviewed alpha mask. The build attaches that mask to decoded original RGB pixels, crops only transparent surrounding space, fits the complete silhouette inside an 8% safety margin and places it on the configured full-canvas background. It never synthesizes a new bag, badge, stitch or strap. The same colour uses the same exact background across custom models; matching catalogue colours share that palette.

Lifestyle/model and detail gallery photographs keep their original scene, inside the standard 4:5 canvas. The launch collage and brand graphics remain editorial exceptions.

## Adding or replacing an image

1. Add an original JPEG, PNG or WebP to `site/assets/products`; use its exact filename in `site/data.js` (`image` and `gallery`). Filenames use letters, digits and hyphens. Configure the approved product background in `image-policy.json`.
2. Prepare primary/custom masks. In a separate Python virtual environment install `requirements-image-masks.txt`, then run `python scripts/prepare-image-masks.py` from the repository root (or `npm run prepare:images` when that environment is active). The pinned tool generates masks only and reuses unchanged reviewed masks. The segmentation model is downloaded once from its official release.
3. Inspect masks and the resulting composition: silhouette, full straps/chains, spaces inside handles, badge, colour, scale and clean edges. Low contrast straps or transparent hardware can require correcting the mask by hand. Never approve automatically just because preparation completed.
4. Run `npm run review:images` only after visual approval. It records both original and mask checksums. Commit `image-masks.json`, corresponding `image-masks/` PNGs and `image-reviews.json` together with source changes. Masks are tied to the exact source checksum; replacing an original invalidates its mask.
5. Run `npm run build` and `npm run check:images`; inspect `_site` before publishing.

## Publication checks

GitHub Actions runs tests, build and validation before deployment. Missing/unreviewed originals, missing/stale/unreviewed masks, incorrect mask dimensions, invalid bounds, unknown background, duplicate filenames and incorrect output format/dimensions stop publication. The previous published site remains active when validation fails.

CI uses saved reviewed masks; it does not install or run segmentation models. Original RGB values are retained before resizing and ordinary WebP encoding; resizing/compression necessarily interpolates pixels. Enlarging a low-resolution source does not restore photographic detail.
