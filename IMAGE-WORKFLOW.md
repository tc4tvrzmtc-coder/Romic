# Romic product image standard

Every published product/gallery and customizer image is WebP on a 1200 × 1500 canvas (4:5). Images fit inside a consistent neutral outer canvas with at least 8% clearance. Reviewed clutch front views remove excess empty backdrop above/below the bag; product photography is otherwise contained without cropping. Responsive versions are generated at 900 × 1125, 600 × 750, 720 × 900, 480 × 600 and 240 × 300. Original files remain unchanged in `site/assets`.

## Adding a new bag

1. Add the original JPEG, PNG or WebP to `site/assets/products`, then reference its exact filename in `site/data.js` (`image` and `gallery`). Filenames must use letters, digits and hyphens.
2. Add the product's reviewed background reference colour to `image-policy.json`. The customizer's colour palette and models are configured in the same file.
3. Inspect every added or replaced image: full bag and straps visible, correct product colour, logo unchanged, comparable product scale, appropriate original background. A common canvas does not remove a photographed background or add detail to a small source.
4. After visual approval run `npm run review:images`, which records checksums for the source images. Commit `image-reviews.json` together with the source changes.
5. Run `npm run build` and `npm run check:images`. Inspect `_site` before publishing.

GitHub Actions runs build and validation before deployment. A missing source, an unreviewed source change, unknown product background, duplicate output filename, unsupported filename, animated source or wrong output format/dimensions stops deployment. A stopped deployment leaves the previous published site in place.

The build uses originals and always rebuilds the complete responsive set; it never repeatedly recompresses earlier derivatives. New source formats are converted and product references are compiled to `.webp` automatically. Unreferenced product/custom images are excluded from the published asset folders.

Brand SVGs, launch collages and other non-product editorial graphics are intentional exceptions. This standard applies to bag photographs consumed by the product catalogue, galleries and customizer. It does not claim to automatically judge product fidelity, backgrounds, logos or visual scale; those require the explicit review in step 3.
