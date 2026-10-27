# TKTX banner
Single-screen, 100vh/100svh tattoo photograph banner with a 32px black scrolling announcement strip, the supplied SVG logo, TKTX's nine menu labels, shop/reviews links, product search, account and shopping bag. Anton headlines, Roboto Mono details, pure black #000000 and white #ffffff.

## Local preview
Run `node serve.cjs` here, then open http://127.0.0.1:5173.
The local preview links to the current https://www.tktx.co/ pages. The bag count is a preview value. No live website was changed. No browser was opened for verification.

## Shopify
1. Copy `shopify/sections/tktx-banner.liquid` into the theme's `sections/` directory.
2. Upload these supplied files to the theme's `assets/`: `anton.ttf`, `roboto-mono.ttf`, `cinematic-tattoo.png`, `tktx-logo-dark.svg`.
3. Add **TKTX editorial banner** through the theme editor.
4. Select the store's main menu and set the Shop and Reviews links. The selected menu supplies the actual Shopify destinations. Fallback menu routes are placeholders until matching pages exist.
5. This section includes its own header and announcement strip. On the intended landing page, hide duplicate theme header/announcement sections to retain the single-screen composition.

The Shopify section uses native search, account, collection and cart routes, the real cart item count, editable copy/announcement text, and an optional replacement background image. The existing live site was used only as the content source; its current platform and routes were not assumed to be the Shopify installation.

## Assets and sources
- User-provided `Group (1).svg`: recolored to pure black #000000, saved as `assets/tktx-logo-dark.svg`.
- User-provided `Group.svg`: recolored to pure white #ffffff, saved as `assets/tktx-logo-light.svg`. Original paths and geometry remain intact.
- Source for menu and store copy: https://www.tktx.co/ (read October 26, 2026). Promotional statements reproduce the supplied site's content.
- Photo: `assets/cinematic-tattoo.png`, copied byte-for-byte from the user-provided `Cinematic Tattoo Studio Portrait.png`. Only browser cropping and a separate CSS readability overlay are applied.
- Headline font: local Anton; detail font: local Roboto Mono.

Announcement text uses fixed 16px desktop / 14px mobile gaps beside each star, and repeats to fill the viewport with a seamless loop.

The header, hero text and footer align to a centered content container with a 1400px maximum width and responsive side gutters. Desktop headline and button widths are capped to suit that container.

## White category section
A new white section follows the banner at `/#categories`, with one centered TKTX Gold product concept, a name beneath it, the existing Anton/Roboto Mono fonts and the same 1400px content limit. This is the first product sample requested before expanding the category list. No price or new medical claims were added.

For Shopify, add `shopify/sections/tktx-categories.liquid` after the banner and upload `assets/tktx-gold-studio.png` to theme assets. Choose **TKTX categories** in the theme editor. The default contains one category block; additional blocks accept real Shopify collections/products, images, captions and links. Select the real product or collection so the default preview image links to the desired destination.

Product source: https://www.tktx.co/product/tktx-mithra-numbing-cream/ — Gold variant. Original reference photo: `assets/tktx-gold-source.webp`. The polished packshot is an AI-generated presentation concept made with the built-in image generation tool; final asset: `assets/tktx-gold-studio.png`; exact prompt: `assets/tktx-gold-prompt.txt`. The generated image is a visual concept, rather than a production packaging master.

## Category carousel
The white section now uses a looping carousel. Desktop shows three complete cards and part of a fourth; its viewport extends to the right of the 1400px container, clips at the screen edge and hides cards to the left of the container. Tablet/mobile show fewer complete cards with the next card peeking in. Previous/next arrows, swipes and an automatic 4.2-second advance are supported. Autoplay pauses while off-screen, on hover/focus, when the tab is hidden, or for reduced-motion preferences.

The local prototype repeats the previously approved TKTX Gold packshot six times to demonstrate layout. In Shopify, replace those six starter blocks with the desired real categories/products. Upload `category-slider.js` to theme assets alongside the product image and fonts.

## Complete page additions
Page order is now hero → benefits → category carousel → image-and-text story → six product cards (3 columns × 2 rows on desktop) → authenticity story → seven-question FAQ and contact link → newsletter footer.

All sections use the pure black/white branding, Anton headings, Roboto Mono labels and a centered maximum 1400px content area. Photography in the two story sections is the original website photography. Benefits, story, authenticity and FAQ prompts use the user-supplied screenshot content; FAQ answers and product labels were read from the homepage. No prices, bestseller claims or new product variants were invented.

The six product-card prototypes use the shared Gold packshot as requested. They show the five versions described on the homepage (Blue, White, Gold, Green, Mithra) with Gold repeated as the sixth layout sample. Product strength/duration text is copied from the site's merchandising copy and is not an independently verified clinical claim.

Newsletter submission in the local prototype validates an email and explicitly reports that no subscription was sent. It does not store or send the address. The Shopify footer uses the native customer/newsletter form instead.

### Shopify sections to add in order
1. TKTX editorial banner — `tktx-banner.liquid`
2. TKTX benefits — `tktx-benefits.liquid`
3. TKTX categories — `tktx-categories.liquid`
4. TKTX product story — preset from `tktx-image-with-text.liquid`
5. TKTX product cards — `tktx-product-cards.liquid`
6. TKTX authenticity — second preset from `tktx-image-with-text.liquid`
7. TKTX FAQ — `tktx-faq.liquid`
8. TKTX footer — `tktx-footer.liquid`

Upload `home-sections.css`, `category-slider.js`, `anton.ttf`, `roboto-mono.ttf`, `cinematic-tattoo.png`, `tktx-logo-dark.svg`, `tktx-gold-studio.png`, `tktx-story.jpg` and `tktx-authentic.jpg` to theme assets. Select the real products and footer menus in the editor. Product cards use real Shopify prices when products are selected; the default prototype uses strength badges instead of invented prices. The shared Gold image remains the default until the option to use actual product photos is enabled.

## Latest refinements
- Pure black (#000000) replaces the warm charcoal interface palette; remaining grays are neutral. Source photographs and colored product/payment/seal artwork are unchanged.
- The NUMBING CREAM OF TKTX story uses the exact supplied `MODELS (9) 1.png`, copied as `assets/tktx-story-model.png` and displayed fully without cropping.
- The ORIGINAL TKTX / ONLY ON TKTX.CO story uses the exact supplied `MODELS (18) 1 (1).png`, copied as `assets/tktx-authentic-model.png`.
- All product-card elements use square corners; category cards have a subtle black 10% border.
- The redesigned square newsletter panel uses the supplied logo as a faint background detail. Footer copy now matches the supplied screenshot, including the full international history, all eleven links, five verified social links, original authenticity seal, seven payment marks, English label, contact help link and copyright.
- Shopify payment marks switch to the store's enabled payment methods when available. Select the actual footer menu in the theme editor. The local newsletter remains a non-sending demonstration.

Also upload `footer-finish.css`, `tktx-logo-light.svg`, `tktx-story-model.png`, `tktx-authentic-model.png`, `tktx-authentic-seal.avif` and all seven `payment-*.webp` files when installing the updated Shopify sections.

The category viewport now clips horizontally with vertical breathing room, stretches cards evenly and preserves the full bottom border, including during slide transitions. The Shopify newsletter watermark uses an explicit theme asset URL.

The benefits strip now contains five desktop columns: Free Delivery, Satisfied Customers, Shipping Worldwide, Multiple Strengths and Anti-Fake QR Code. Each item has a line icon and compact supporting text; mobile uses stacked rows.

A sixth benefit now shows 4.7/5, five gold stars and “Based on 898 reviews”, as supplied in the latest user reference. The desktop benefits row has six columns.

Benefits now use a framed 3-column × 2-row desktop grid with subtle row/column separators. The rating benefit keeps its single star icon above 4.7/5; the lower five-star strip has been removed.
