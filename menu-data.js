/**
 * ============================================================
 *  FOODIEBOX — MENU DATA
 * ============================================================
 *  This is the ONLY file you need to touch to update the menu.
 *
 *  TO ADD A PRICE:
 *    Find the item and change   price: null   to a number, e.g.
 *    price: 3500
 *    The site updates itself — the item's "Add to Cart" button
 *    switches on automatically once a price is set.
 *
 *  TO ADD/CHANGE A PHOTO:
 *    Drop your image into the /images folder, then set the
 *    item's "image" field to its filename, e.g. image: "jollof.jpg"
 *    Leave it as null if you don't have a photo for that item yet.
 *
 *  TO ADD A DESCRIPTION:
 *    The printed menu didn't include descriptions, so these are
 *    blank. Add a short one any time, e.g.
 *    description: "Slow-cooked with smoked fish and assorted meat"
 *
 *  Note: the printed menu ends several sections with "E.t.c",
 *  meaning more options are available on request — that's not
 *  a dish, so it isn't listed as an item below. Add any extra
 *  dishes as new entries the same way the others are written.
 * ============================================================
 */

const MENU_DATA = [
  {
    id: "soup",
    name: "Soup",
    image: "images/native-soup.jpg", // banner photo for this category — swap any time
    items: [
      { id: "soup-afang", name: "Afang Soup", description: "", price: null, image: null },
      { id: "soup-egusi", name: "Egusi Soup", description: "", price: null, image: null },
      { id: "soup-okro", name: "Okro Soup", description: "", price: null, image: null },
      { id: "soup-banga", name: "Banga Soup", description: "", price: null, image: null },
      { id: "soup-bitterleaf", name: "Bitterleaf Soup", description: "", price: null, image: null },
      { id: "soup-pepper", name: "Pepper Soup", description: "", price: null, image: null },
      { id: "soup-efo", name: "Efo", description: "", price: null, image: null },
      { id: "soup-ogbono", name: "Ogbono Soup", description: "", price: null, image: null },
      { id: "soup-white", name: "White Soup", description: "", price: null, image: null },
      { id: "soup-ofo", name: "Ofo Soup", description: "", price: null, image: null },
      { id: "soup-achie", name: "Achie Soup", description: "", price: null, image: null },
      { id: "soup-ewedu", name: "Ewedu", description: "", price: null, image: null },
      { id: "soup-oha", name: "Oha Soup", description: "", price: null, image: null }
    ]
  },
  {
    id: "rice",
    name: "Rice",
    image: "images/rice-special.jpg",
    items: [
      { id: "rice-white", name: "White Rice", description: "", price: null, image: null },
      { id: "rice-jollof", name: "Jollof Rice", description: "", price: null, image: null },
      { id: "rice-coconut", name: "Coconut Rice", description: "", price: null, image: null },
      { id: "rice-banga", name: "Banga Rice", description: "", price: null, image: null },
      { id: "rice-fried", name: "Fried Rice", description: "", price: null, image: "images/rice-special.jpg" },
      { id: "rice-palmoil", name: "Palm Oil Rice", description: "", price: null, image: null },
      { id: "rice-vegetable", name: "Vegetable Rice", description: "", price: null, image: null },
      { id: "rice-faith-special", name: "Faith Special Rice", description: "", price: null, image: null }
    ]
  },
  {
    id: "snacks",
    name: "Snacks",
    image: null,
    items: [
      { id: "snacks-puffpuff", name: "Puff Puff", description: "", price: null, image: null },
      { id: "snacks-fishroll", name: "Fish Roll", description: "", price: null, image: null },
      { id: "snacks-eggroll", name: "Egg Roll", description: "", price: null, image: null },
      { id: "snacks-pancake", name: "Pancake", description: "", price: null, image: null },
      { id: "snacks-samosa", name: "Samosa", description: "", price: null, image: null },
      { id: "snacks-peanut", name: "Peanut", description: "", price: null, image: null }
    ]
  },
  {
    id: "sauce",
    name: "Sauce",
    image: "images/rich-stew.jpg",
    items: [
      { id: "sauce-tomato", name: "Tomato Stew", description: "", price: null, image: "images/rich-stew.jpg" },
      { id: "sauce-chinese", name: "Chinese Sauce", description: "", price: null, image: null },
      { id: "sauce-banga", name: "Banga Stew", description: "", price: null, image: null },
      { id: "sauce-jamaica", name: "Jamaica Sauce", description: "", price: null, image: null },
      { id: "sauce-gizdodo", name: "Gizdodo", description: "", price: null, image: null },
      { id: "sauce-pepper", name: "Pepper Sauce", description: "", price: null, image: null }
    ]
  },
  {
    id: "swallow",
    name: "Swallow",
    image: null,
    items: [
      // Printed exactly as shown on the menu (paired names on the same line).
      { id: "swallow-cassava-eba", name: "Cassava Flour, Eba", description: "", price: null, image: null },
      { id: "swallow-pando-maize", name: "Pando, Maize Flour", description: "", price: null, image: null },
      { id: "swallow-semo-fufu", name: "Semo, Fufu", description: "", price: null, image: null },
      { id: "swallow-plantain", name: "Plantain Flour", description: "", price: null, image: null }
    ]
  },
  {
    id: "extra",
    name: "Extra",
    image: "images/peppered-extra.jpg",
    items: [
      { id: "extra-friedplantain", name: "Fried Plantain", description: "", price: null, image: null },
      { id: "extra-friedegg", name: "Fried Egg", description: "", price: null, image: null },
      { id: "extra-fishbarbecue", name: "Fish Barbecue", description: "", price: null, image: null },
      { id: "extra-ponmosauce", name: "Ponmo Sauce", description: "", price: null, image: null },
      { id: "extra-goatmeatpepper", name: "Goat Meat Pepper", description: "", price: null, image: "images/peppered-extra.jpg" },
      { id: "extra-chicken", name: "Chicken", description: "", price: null, image: null },
      { id: "extra-suya", name: "Suya", description: "", price: null, image: null },
      { id: "extra-fishandchips", name: "Fish and Chips", description: "", price: null, image: null },
      { id: "extra-akamu", name: "Akamu", description: "", price: null, image: null },
      { id: "extra-akara", name: "Akara", description: "", price: null, image: null },
      { id: "extra-moimoi", name: "Moi-Moi", description: "", price: null, image: null },
      // Printed on the menu as "Sharwama" — likely meant as "Shawarma"; kept as printed, rename here if needed.
      { id: "extra-sharwama", name: "Sharwama", description: "", price: null, image: null },
      { id: "extra-bole", name: "Bole", description: "", price: null, image: null },
      { id: "extra-abacha", name: "Abacha", description: "", price: null, image: null },
      // Printed on the menu as "Nkwubi" — likely meant as "Nkwobi", kept as printed, rename here if needed.
      { id: "extra-nkwubi", name: "Nkwubi", description: "", price: null, image: null }
    ]
  },
  {
    id: "drinks",
    name: "Drinks",
    image: null,
    items: [
      { id: "drinks-zobo", name: "Zobo Drink", description: "", price: null, image: null }
    ]
  }
];
