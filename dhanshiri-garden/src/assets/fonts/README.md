# Bangla display font — Li Ador Noirrit

Li Ador Noirrit is the Bangla display typeface requested for this site. It is distributed by
Lipighor Font Foundry under its own licence, so the font file is **not** included in this repository.

To switch it on:

1. Get the **Unicode** build of Li Ador Noirrit from its official source and confirm the licence allows web use.
2. Copy the files into this folder, named like:
   - `LiAdorNoirrit-Regular.woff2` (or `.woff` / `.ttf`)
   - `LiAdorNoirrit-SemiBold.woff2` (optional — used for headings; any file name containing `bold` or `600`/`700` is treated as the heavier weight)
3. Rebuild. The font is picked up automatically (see `src/lib/brandFont.js`). Until then the site uses Hind Siliguri.

If you have only a `.ttf`, convert it to `.woff2` first for faster loading (e.g. `npx ttf2woff2 < in.ttf > out.woff2`).
