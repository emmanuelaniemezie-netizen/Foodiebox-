/**
 * ============================================================
 *  FOODIEBOX — CART
 *  Small, framework-free cart store. Persists to localStorage
 *  so a customer's cart survives a page refresh.
 * ============================================================
 */

const Cart = (() => {
  const STORAGE_KEY = "foodiebox_cart_v1";
  let items = {}; // { [itemId]: { id, name, price, qty, image, category } }
  let listeners = [];

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      items = raw ? JSON.parse(raw) : {};
    } catch (err) {
      console.error("FOODIEBOX: could not read saved cart, starting empty.", err);
      items = {};
    }
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("FOODIEBOX: could not save cart.", err);
    }
  }

  function notify() {
    persist();
    listeners.forEach((fn) => fn(getState()));
  }

  function onChange(fn) {
    listeners.push(fn);
  }

  function add(item) {
    if (typeof item.price !== "number") {
      console.warn(`FOODIEBOX: "${item.name}" has no price yet, so it can't be added to the cart.`);
      return false;
    }
    if (items[item.id]) {
      items[item.id].qty += 1;
    } else {
      items[item.id] = {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image || null,
        category: item.category || "",
        qty: 1
      };
    }
    notify();
    return true;
  }

  function remove(id) {
    delete items[id];
    notify();
  }

  function setQty(id, qty) {
    if (!items[id]) return;
    if (qty <= 0) {
      remove(id);
      return;
    }
    items[id].qty = qty;
    notify();
  }

  function increment(id) {
    if (!items[id]) return;
    items[id].qty += 1;
    notify();
  }

  function decrement(id) {
    if (!items[id]) return;
    setQty(id, items[id].qty - 1);
  }

  function clear() {
    items = {};
    notify();
  }

  function getItems() {
    return Object.values(items);
  }

  function getCount() {
    return getItems().reduce((sum, i) => sum + i.qty, 0);
  }

  function getSubtotal() {
    return getItems().reduce((sum, i) => sum + i.qty * i.price, 0);
  }

  function isEmpty() {
    return getItems().length === 0;
  }

  function getState() {
    return {
      items: getItems(),
      count: getCount(),
      subtotal: getSubtotal(),
      isEmpty: isEmpty()
    };
  }

  load();

  return {
    onChange,
    add,
    remove,
    setQty,
    increment,
    decrement,
    clear,
    getItems,
    getCount,
    getSubtotal,
    isEmpty,
    getState
  };
})();
