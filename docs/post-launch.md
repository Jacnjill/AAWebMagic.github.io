# After launch

These notes were left for a later pass. They are not in this build.

## Home hero sky

The right side of the home hero sky can show stair-step banding at desktop size. Re-export from the full-size original with dithering and, if needed, a slightly lower-contrast grade, or lay a light film grain (about 2–3%) over the sky. Check the result at desktop size. Home Lighthouse on mobile needs to stay at 95 or above. The last measured home score before this note was 93, and the LCP element was still `hero-900.avif`.

## Card grids sit short of the header

The destination, holiday-type and package card grids stop about 50px short of the right edge used by the header and footer. That inset is the desktop float clearance on `.wrap` (extra `padding-right` inside the 768px query). The header uses `.header-inner`, which does not have that padding. A later pass can give those grids the same max-width and padding as the header and drop fixed column widths. Check at 1280, 1440 and 1920. Changing `.wrap` for every section can let the WhatsApp button overlap the right-hand column, so this was left alone.

## Greece hillside

The Greece card is cropped so the flat blue band at the top is out of frame. A later pass can soften the hillside if it still looks over-sharpened. This build did not add a sharpen pass to that frame.
