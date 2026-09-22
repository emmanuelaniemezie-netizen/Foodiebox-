/**
 * ============================================================
 *  FOODIEBOX — APP LOGIC
 *  Reads SITE_CONFIG + MENU_DATA and renders the page, wires up
 *  the cart drawer, checkout form, and WhatsApp ordering.
 *  You shouldn't need to edit this file to update the business —
 *  see config.js and menu-data.js for that.
 * ============================================================
 */

(function () {
  "use strict";

  let activeCategory = "all";
  let searchTerm = "";

  /* ---------------- Helpers ---------------- */

  function formatPrice(price) {
    if (typeof price !== "number") return "Price coming soon";
    const formatted = price.toLocaleString();
    return SITE_CONFIG.currencyPosition === "before"
      ? `${SITE_CONFIG.currency}${formatted}`
      : `${formatted} ${SITE_CONFIG.currency}`;
  }

  function buildWhatsAppUrl(message) {
    return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  function greetingMessage() {
    return `Hi ${SITE_CONFIG.businessName}, I'd like to place an order.`;
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  function lockScroll(lock) {
    document.body.style.overflow = lock ? "hidden" : "";
  }

  /* ---------------- Static content from config ---------------- */

  function renderStaticContent() {
    document.getElementById("aboutBody").textContent = SITE_CONFIG.aboutText;
    document.getElementById("year").textContent = new Date().getFullYear();

    const whatsappLinks = [
      "navWhatsappBtn",
      "heroWhatsappBtn",
      "contactWhatsappBtn",
      "footerWhatsappBtn"
    ];
    whatsappLinks.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.href = buildWhatsAppUrl(greetingMessage());
    });

    document.getElementById("contactWhatsapp").textContent = `WhatsApp: ${SITE_CONFIG.whatsappDisplay}`;
    document.getElementById("contactLocation").textContent = SITE_CONFIG.location;
    document.getElementById("footerWhatsappNumber").textContent = SITE_CONFIG.whatsappDisplay;
  }

  function renderDeliveryInfo() {
    const grid = document.getElementById("deliveryGrid");
    const { areas, fees, estimatedTime } = SITE_CONFIG.delivery;

    const areasHtml = areas.length
      ? `<ul>${areas.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}</ul>`
      : `<p class="delivery-placeholder">Coming soon — ask us on WhatsApp for your area.</p>`;

    const feesHtml = fees.length
      ? `<ul>${fees.map((f) => `<li>${escapeHtml(f.area)}: ${formatPrice(f.fee)}</li>`).join("")}</ul>`
      : `<p class="delivery-placeholder">Coming soon.</p>`;

    const timeHtml = estimatedTime
      ? `<p>${escapeHtml(estimatedTime)}</p>`
      : `<p class="delivery-placeholder">Coming soon.</p>`;

    grid.innerHTML = `
      <div class="delivery-card">
        <h3>Delivery areas</h3>
        ${areasHtml}
      </div>
      <div class="delivery-card">
        <h3>Delivery fees</h3>
        ${feesHtml}
      </div>
      <div class="delivery-card">
        <h3>Estimated delivery time</h3>
        ${timeHtml}
      </div>
    `;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* ---------------- Menu rendering ---------------- */

  function renderCategoryTabs() {
    const wrap = document.getElementById("categoryTabs");
    const tabs = [{ id: "all", name: "All" }, ...MENU_DATA.map((c) => ({ id: c.id, name: c.name }))];

    wrap.innerHTML = tabs
      .map(
        (tab) => `
        <button class="category-tab${tab.id === activeCategory ? " is-active" : ""}"
                role="tab"
                aria-selected="${tab.id === activeCategory}"
                data-category="${tab.id}">${tab.name}</button>`
      )
      .join("");

    wrap.querySelectorAll(".category-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeCategory = btn.dataset.category;
        renderCategoryTabs();
        renderMenu();
      });
    });
  }

  function itemMatchesSearch(item) {
    if (!searchTerm) return true;
    return item.name.toLowerCase().includes(searchTerm);
  }

  function renderMenu() {
    const container = document.getElementById("menuCategories");
    const emptyState = document.getElementById("menuEmpty");
    const categoriesToShow = MENU_DATA.filter(
      (c) => activeCategory === "all" || c.id === activeCategory
    );

    let totalVisibleItems = 0;
    let html = "";

    categoriesToShow.forEach((category) => {
      const visibleItems = category.items.filter(itemMatchesSearch);
      if (visibleItems.length === 0) return;
      totalVisibleItems += visibleItems.length;

      html += `
        <div class="menu-category" id="cat-${category.id}">
          <div class="menu-category-head">
            ${
              category.image
                ? `<div class="menu-category-photo"><img src="${category.image}" alt="" loading="lazy" /></div>`
                : ""
            }
            <h3>${category.name}</h3>
          </div>
          <ul class="menu-list">
            ${visibleItems.map((item) => renderMenuItem(item, category.name)).join("")}
          </ul>
        </div>
      `;
    });

    container.innerHTML = html;
    emptyState.classList.toggle("is-visible", totalVisibleItems === 0);

    container.querySelectorAll("[data-add-item]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = findItemById(btn.dataset.addItem);
        if (!item) return;
        const added = Cart.add({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: btn.dataset.category
        });
        if (added) {
          showToast(`Added ${item.name} to your order`);
          openCartBriefly();
        }
      });
    });
  }

  function renderMenuItem(item, categoryName) {
    const hasPrice = typeof item.price === "number";
    const photo = item.image
      ? `<img src="${item.image}" alt="" loading="lazy" />`
      : `<span class="placeholder-glyph" aria-hidden="true">&#127860;</span>`;

    return `
      <li class="menu-item">
        <div class="menu-item-photo">${photo}</div>
        <div class="menu-item-info">
          <h4>${escapeHtml(item.name)}</h4>
          ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ""}
        </div>
        <span class="menu-item-price${hasPrice ? "" : " is-unset"}">${formatPrice(item.price)}</span>
        <button class="menu-item-add"
                data-add-item="${item.id}"
                data-category="${escapeHtml(categoryName)}"
                aria-label="Add ${escapeHtml(item.name)} to cart"
                ${hasPrice ? "" : "disabled"}>+</button>
      </li>
    `;
  }

  function findItemById(id) {
    for (const category of MENU_DATA) {
      const match = category.items.find((i) => i.id === id);
      if (match) return match;
    }
    return null;
  }

  /* ---------------- Cart drawer ---------------- */

  function renderCart(state) {
    const countEl = document.getElementById("cartCount");
    countEl.textContent = state.count;
    countEl.hidden = state.count === 0;

    document.getElementById("drawerEmpty").classList.toggle("is-visible", state.isEmpty);
    document.getElementById("drawerFoot").hidden = state.isEmpty;

    const linesEl = document.getElementById("cartLines");
    linesEl.innerHTML = state.items
      .map(
        (line) => `
      <div class="cart-line" data-line="${line.id}">
        <div class="cart-line-photo">
          ${line.image ? `<img src="${line.image}" alt="" />` : `<span aria-hidden="true">&#127860;</span>`}
        </div>
        <div class="cart-line-info">
          <h4>${escapeHtml(line.name)}</h4>
          <span>${formatPrice(line.price)} each</span>
          <div class="qty-control">
            <button type="button" data-qty-down aria-label="Decrease quantity">&minus;</button>
            <span>${line.qty}</span>
            <button type="button" data-qty-up aria-label="Increase quantity">+</button>
          </div>
          <div><button type="button" class="cart-line-remove" data-remove>Remove</button></div>
        </div>
        <div class="cart-line-total">${formatPrice(line.price * line.qty)}</div>
      </div>
    `
      )
      .join("");

    linesEl.querySelectorAll("[data-line]").forEach((row) => {
      const id = row.dataset.line;
      row.querySelector("[data-qty-up]").addEventListener("click", () => Cart.increment(id));
      row.querySelector("[data-qty-down]").addEventListener("click", () => Cart.decrement(id));
      row.querySelector("[data-remove]").addEventListener("click", () => Cart.remove(id));
    });

    document.getElementById("cartTotal").textContent = formatPrice(state.subtotal);
  }

  function openCart() {
    document.getElementById("cartDrawer").classList.add("is-open");
    document.getElementById("cartDrawer").setAttribute("aria-hidden", "false");
    document.getElementById("overlay").classList.add("is-open");
    lockScroll(true);
    document.getElementById("cartCloseBtn").focus();
  }

  function closeCart() {
    document.getElementById("cartDrawer").classList.remove("is-open");
    document.getElementById("cartDrawer").setAttribute("aria-hidden", "true");
    if (!document.getElementById("checkoutModal").classList.contains("is-open")) {
      document.getElementById("overlay").classList.remove("is-open");
      lockScroll(false);
    }
  }

  function openCartBriefly() {
    // Give quick visual confirmation without forcing a full drawer open on every tap.
    // (kept simple: just show the toast; drawer opens only when the cart icon is used)
  }

  /* ---------------- Checkout modal ---------------- */

  function renderCheckoutSummary(state) {
    const el = document.getElementById("checkoutSummary");
    el.innerHTML =
      state.items
        .map(
          (line) => `
        <div class="checkout-summary-row">
          <span>${escapeHtml(line.name)} &times; ${line.qty}</span>
          <span>${formatPrice(line.price * line.qty)}</span>
        </div>`
        )
        .join("") +
      `<div class="checkout-summary-row total"><span>Total</span><span>${formatPrice(state.subtotal)}</span></div>`;
  }

  function openCheckout() {
    if (Cart.isEmpty()) return;
    renderCheckoutSummary(Cart.getState());
    document.getElementById("checkoutModal").classList.add("is-open");
    document.getElementById("overlay").classList.add("is-open");
    lockScroll(true);
    document.getElementById("customerName").focus();
  }

  function closeCheckout() {
    document.getElementById("checkoutModal").classList.remove("is-open");
    if (!document.getElementById("cartDrawer").classList.contains("is-open")) {
      document.getElementById("overlay").classList.remove("is-open");
      lockScroll(false);
    }
  }

  function validateCheckoutForm(data) {
    let valid = true;
    const setError = (fieldId, errorId, show) => {
      document.getElementById(fieldId).setAttribute("aria-invalid", show ? "true" : "false");
      document.getElementById(errorId).classList.toggle("is-visible", show);
      if (show) valid = false;
    };

    setError("customerName", "errorName", data.name.trim().length === 0);

    const digits = data.phone.replace(/[^\d+]/g, "");
    setError("customerPhone", "errorPhone", digits.length < 7);

    setError("customerAddress", "errorAddress", data.address.trim().length === 0);

    return valid;
  }

  function buildOrderMessage(data, state) {
    const lines = state.items
      .map((line) => `- ${line.name} x${line.qty} — ${formatPrice(line.price * line.qty)}`)
      .join("\n");

    return [
      `${SITE_CONFIG.businessName} ORDER`,
      "",
      `Customer Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Delivery Address: ${data.address}`,
      "",
      "ORDER:",
      lines,
      "",
      `TOTAL: ${formatPrice(state.subtotal)}`,
      "",
      `Order Note: ${data.note || "-"}`
    ].join("\n");
  }

  function handleCheckoutSubmit(e) {
    e.preventDefault();
    const data = {
      name: document.getElementById("customerName").value,
      phone: document.getElementById("customerPhone").value,
      address: document.getElementById("customerAddress").value,
      note: document.getElementById("orderNote").value
    };

    if (!validateCheckoutForm(data)) return;

    const submitBtn = document.getElementById("placeOrderBtn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Opening WhatsApp…";

    const state = Cart.getState();
    const message = buildOrderMessage(data, state);
    const url = buildWhatsAppUrl(message);

    window.open(url, "_blank", "noopener");

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.08L2 22l5.05-1.32A9.94 9.94 0 0012.02 22C17.5 22 22 17.52 22 12S17.5 2 12.02 2zm5.87 14.2c-.25.7-1.45 1.34-2 1.42-.53.08-1.2.11-1.94-.12-.45-.14-1.02-.33-1.76-.64-3.1-1.34-5.13-4.45-5.28-4.66-.15-.2-1.26-1.68-1.26-3.2 0-1.52.8-2.27 1.08-2.58.28-.3.6-.38.8-.38h.58c.18 0 .43-.07.67.52.25.6.85 2.08.92 2.23.08.15.13.33.02.53-.1.2-.15.33-.3.5-.15.18-.3.4-.44.53-.15.15-.3.3-.13.6.18.3.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.48 1.53.3.15.48.13.66-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.28.1 1.75.83 2.05.98.3.15.5.22.57.35.08.13.08.75-.17 1.45z"/></svg> Place Order on WhatsApp';
    }, 1200);

    showToast("Order sent to WhatsApp!");
    document.getElementById("checkoutForm").reset();
    Cart.clear();
    closeCheckout();
    closeCart();
  }

  /* ---------------- Mobile nav ---------------- */

  function toggleMobileNav(forceClose) {
    const nav = document.getElementById("navLinks");
    const btn = document.getElementById("hamburgerBtn");
    const isOpen = forceClose ? false : !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));
  }

  /* ---------------- Wiring ---------------- */

  function init() {
    renderStaticContent();
    renderDeliveryInfo();
    renderCategoryTabs();
    renderMenu();

    Cart.onChange(renderCart);
    renderCart(Cart.getState());

    document.getElementById("cartOpenBtn").addEventListener("click", openCart);
    document.getElementById("cartCloseBtn").addEventListener("click", closeCart);
    document.getElementById("continueShoppingBtn").addEventListener("click", closeCart);
    document.getElementById("drawerEmptyBrowseBtn").addEventListener("click", () => {
      closeCart();
      document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("checkoutBtn").addEventListener("click", () => {
      closeCart();
      openCheckout();
    });
    document.getElementById("checkoutCloseBtn").addEventListener("click", closeCheckout);
    document.getElementById("checkoutForm").addEventListener("submit", handleCheckoutSubmit);

    document.getElementById("overlay").addEventListener("click", () => {
      closeCart();
      closeCheckout();
      toggleMobileNav(true);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeCart();
        closeCheckout();
        toggleMobileNav(true);
      }
    });

    document.getElementById("hamburgerBtn").addEventListener("click", () => toggleMobileNav());
    document.querySelectorAll("[data-nav-link]").forEach((link) => {
      link.addEventListener("click", () => toggleMobileNav(true));
    });

    let searchTimer;
    document.getElementById("menuSearch").addEventListener("input", (e) => {
      clearTimeout(searchTimer);
      const value = e.target.value;
      searchTimer = setTimeout(() => {
        searchTerm = value.trim().toLowerCase();
        renderMenu();
      }, 150);
    });

    window.addEventListener("load", () => {
      document.getElementById("pageLoader").classList.add("is-hidden");
    });
    // Fallback in case the load event already fired.
    setTimeout(() => document.getElementById("pageLoader").classList.add("is-hidden"), 1200);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
