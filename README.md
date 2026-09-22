# FOODIEBOX website

A self-contained, no-build website: plain HTML, CSS and JavaScript.
No React/Next.js, no npm dependencies to install — just files a
browser can open.

## 1. Project structure

```
foodiebox/
├── index.html          ← the whole page (hero, menu, gallery, cart, checkout, etc.)
├── css/
│   └── style.css       ← all styling
├── js/
│   ├── config.js       ← business info: name, WhatsApp number, currency, delivery info
│   ├── menu-data.js    ← the menu itself (categories, items, prices, photos)
│   ├── cart.js         ← cart logic (add/remove/qty/totals)
│   └── main.js         ← renders the page and wires up all the buttons/forms
├── images/
│   ├── favicon.svg
│   ├── rice-special.jpg
│   ├── peppered-extra.jpg
│   ├── rich-stew.jpg
│   └── native-soup.jpg
└── README.md
```

## 2. Running it locally

You don't need to install anything to open the site — but running it
through a tiny local server avoids a few browser quirks, so it's the
recommended way to test.

**If you have Node.js installed** (you can check with `node -v`):

```
cd foodiebox
npx serve
```

`npx` will fetch the small `serve` tool on first run, then print a
local address such as `http://localhost:3000` — open that in your
browser.

**No Node.js?** Python works just as well:

```
cd foodiebox
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

**Simplest option:** just double-click `index.html` — it will open
directly in your browser and everything works the same way, since
there's no server-side code.

## 3. Where to edit things

- **Prices** — open `js/menu-data.js`. Every item currently has
  `price: null` (that's the blank column you asked for). Change it to
  a number, e.g. `price: 3500`, and that item's "Add to Cart" button
  switches on by itself.
- **Business info, WhatsApp number, currency** — open `js/config.js`.
  Everything from the site name to the currency symbol lives there in
  one place.
- **Menu items/photos/descriptions** — also in `js/menu-data.js`. Drop
  new photos into `/images` and reference the filename in an item's
  `image` field.
- **Delivery areas, fees, estimated time** — the `delivery` block in
  `js/config.js`. Left empty on purpose; fill it in whenever it's
  ready and the "Delivery Information" section updates automatically.

Two names on the printed menu look like likely typos ("Sharwama",
"Nkwubi") — I kept them exactly as printed rather than guess, with a
comment next to each in `menu-data.js` so you can rename them in one
edit if you'd like ("Shawarma", "Nkwobi").

## 4. How WhatsApp ordering works

There's no backend — every "order" is really just a normal WhatsApp
message, pre-written for the customer:

1. A customer browses the menu, adds items, and taps **Checkout**.
2. They fill in their name, phone, address, and an optional note.
3. On submit, the site builds a message like:

   ```
   FOODIEBOX ORDER

   Customer Name: ...
   Phone: ...
   Delivery Address: ...

   ORDER:
   - Jollof Rice x2 — 7,000 RWF
   - Zobo Drink x1 — 1,500 RWF

   TOTAL: 8,500 RWF

   Order Note: -
   ```

4. It opens `https://wa.me/<number>?text=<that message>` in a new tab,
   which launches WhatsApp (web or app) with the message already
   typed into a chat with FOODIEBOX — the customer just taps send.

The same wa.me pattern powers every other "Order on WhatsApp" button
on the site, just with a short generic greeting instead of a full order.

**One thing to double-check:** the number on your menu is written as
`0792106516`, and the menu also lists "Kibagabaga" — a Kigali,
Rwanda neighbourhood — so `js/config.js` assumes Rwanda's country
code and turns it into `250792106516` for the WhatsApp link. If
FOODIEBOX isn't based in Rwanda, open `js/config.js` and fix the
`whatsappNumber` value (country code + number, no "+", no leading 0).

## 5. What's already working

- Sticky nav with mobile hamburger menu
- Category tabs + live search across the menu
- Cart drawer with quantity controls, running total, and an empty-cart state
- Checkout form with validation (name, phone, address required)
- WhatsApp order message generation, as above
- Delivery-info section that stays empty until you fill in `config.js`
- Responsive layout, keyboard-accessible buttons/forms, reduced-motion support
- Basic SEO meta tags, Open Graph tags, and an SVG favicon

## 6. Before you launch

- Add real prices in `menu-data.js`.
- Confirm the WhatsApp number/country code in `config.js`.
- Fill in delivery areas, fees and times once they're decided.
- Swap in more food photos as you get them — the four you sent are
  already used in the hero, the gallery, and as category banners for
  Soup, Rice, Sauce and Extra.
