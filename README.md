# Developer portfolio

A responsive WordPress and WooCommerce developer portfolio with a homepage and dedicated projects page, built with HTML, Tailwind CSS, custom CSS, and vanilla JavaScript.

Open `index.html` in your browser. An internet connection is needed for Tailwind CSS and Google Fonts. No build step is required.

`projects.html` contains the full four-project collection with category filters. The homepage project section links to it through “View all projects.” Both pages share styles, navigation behavior, and project-filter JavaScript.

Includes mobile navigation, project category filters, scroll reveals, subtle floating animations, reduced-motion support, a keyboard skip link, an email copy button, and an accessible contact form. Layout refinements for phone, tablet, and desktop screens are in `responsive.css`.

Before publishing, replace the sample name Alex Morgan and all occurrences of `hello@example.com` in `index.html`. JavaScript reads the recipient from the visible contact email. The four project previews are clearly marked concept projects; replace them with your own work.

Project cards use local SVG image assets in `assets/projects/`, with two WordPress and two WooCommerce projects. Replace each image's `src` and `alt` in `index.html` to use your own screenshots. Previews keep a consistent 12:7 aspect ratio and the grid changes from one column on mobile to two on larger screens.

The contact form validates name, email, service, and project details, then prepares an encoded email draft in the visitor's email application. It does not send email or claim delivery. Entered details remain available if the visitor has no email application configured. Direct web delivery requires connecting a backend or form service; no credentials or external form provider are configured. Without JavaScript, the HTML form falls back to the browser's native mailto handling.

Tailwind's CDN is used for convenient previewing. For a production deployment, compile Tailwind into a local CSS file.
