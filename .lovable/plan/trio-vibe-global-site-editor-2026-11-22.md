# Trio Vibe global site editor

Keep the current public design and content as the default, while moving the site’s editable copy, images, sections, and theme into Lovable Cloud. Cloud is connected; use the confirmed account scope of email and role only, with no extra profile table.

## Build

1. **Shared content and permissions**
   - Add `site_content` (`key`, JSON `value`, `type`, `page`) and a single-row `site_theme` with the requested color and font fields.
   - Add protected Admin/User roles, signup role assignment, row-level access rules, and public read access for published website data. Visitors and User accounts can read; only Admin accounts can change it.
   - Seed every current public-page text, image URL, link, case-study number, section setting, and the current dark/gold theme. Keep a database copy of the original values for Reset.
   - Add public image storage with uploads restricted to Admin accounts.

2. **Load the current site from Cloud**
   - Adapt the existing sections to render from the seeded content instead of their in-file copy.
   - Fetch the complete site data and theme on each public page load, apply theme values through existing CSS variables, and refresh open pages when published data changes.
   - Render existing sections in the saved order; support hiding, restoring, reordering, adding, and deleting custom text/image sections.

3. **`/admin` dashboard and account access**
   - Add email/password sign-in and a first-time account creation path for `admin@mysite.com`; assign that verified address the Admin role and other accounts the User role. Keep email confirmation enabled and never put the supplied temporary password in source code.
   - Provide Content, Theme preview, Sections, and Media Library views. Users can inspect but cannot change data; Admins can edit copy, links, images, colors, and font.
   - Save applies changes to the shared live site immediately; Publish provides an explicit publish action without hiding saved edits from visitors. Reset restores the database’s original snapshot.
   - Show “Edit Site” only to signed-in Admins.

4. **Verify**
   - Confirm seeded values match the current site, including all case-study metrics and images.
   - Verify anonymous reads, Admin writes, User read-only access, theme updates, section changes, media upload, and reset behavior; run the app’s available checks and test the `/admin` flow.

## Technical details

- Use a public `createServerFn` read with a publishable Cloud client and narrow anonymous SELECT policies; keep authenticated writes behind RLS and Admin role checks.
- Register only the needed database tables for Realtime and have clients refetch the shared data after changes.
- Use the generated browser client for email sign-in and media uploads; keep privileged clients and credentials out of the browser.
- Keep the existing section components, visual tokens, and navigation; only the dashboard and CMS wiring are new.