// Philips E-Commerce Core Application Engine
// Inspired by MittiFresh Architecture

class PhilipsApp {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('philips_cart')) || [
      { productId: 'airfryer-xxl-digital', variantName: '7.2L XXL Smart Sensing (HD9860)', price: 18999, qty: 1 },
      { productId: 'hue-smart-bulb-rgb', variantName: 'Single Bulb', price: 2499, qty: 2 }
    ];
    this.wishlist = JSON.parse(localStorage.getItem('philips_wishlist')) || ['hue-smart-bulb-rgb', 'lumea-ipl-advanced'];
    this.selectedCategory = 'all';
    this.activeCoupon = null;
    this.currentReviewIndex = 0;
    this.statsAnimated = false;

    this.init();
  }

  init() {
    this.initHeaderAndBanner();
    this.renderHomepageCategories();
    this.renderCategoryTabs();
    this.renderProducts();
    this.renderReviews();
    this.startReviewsAutoPlay();
    this.renderFaqs();
    this.renderStats();
    this.updateCartUI();
    this.updateWishlistUI();
    this.initScrollAnimations();
    this.bindEvents();
  }

  // Information Architecture 16 Category Cards Rendering
  renderHomepageCategories() {
    const container = document.getElementById('ia-category-container');
    if (!container) return;

    container.innerHTML = PHILIPS_DATA.homepageCategories.map((cat, idx) => `
      <a href="#bestsellers" class="ia-category-card reveal-on-scroll" data-delay="${(idx % 4) * 80}" onclick="app.setSubcategoryFilter('${cat.name}')">
        <div class="ia-category-icon">
          <i class="fa-solid ${cat.icon}"></i>
        </div>
        <div class="ia-category-title">${cat.name}</div>
        <div class="ia-category-parent">${cat.parent}</div>
      </a>
    `).join('');

    this.reobserveAnimations();
  }

  // Announcement Banner & Sticky Header
  initHeaderAndBanner() {
    const banner = document.getElementById('announcement-banner');
    const closeBtn = document.getElementById('close-announcement');

    if (sessionStorage.getItem('philips_banner_dismissed') === 'true' && banner) {
      banner.style.display = 'none';
    }

    if (closeBtn && banner) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        banner.style.display = 'none';
        sessionStorage.setItem('philips_banner_dismissed', 'true');
      });
    }

    window.addEventListener('scroll', () => {
      const header = document.getElementById('site-header');
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('is-sticky', 'scrolled');
        } else {
          header.classList.remove('is-sticky', 'scrolled');
        }
      }

      this.checkStatsScroll();
    });
  }

  setParentCategoryFilter(parentName) {
    this.selectedCategory = parentName;
    this.renderCategoryTabs();
    this.renderProducts();
    const section = document.getElementById('bestsellers');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  }

  setSubcategoryFilter(subName) {
    this.selectedCategory = subName;
    const slug = subName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (subName !== 'all') {
      window.location.hash = `#category/${slug}`;
    } else {
      window.location.hash = '#bestsellers';
    }
    this.renderCategoryTabs();
    this.renderProducts();
    const section = document.getElementById('bestsellers');
    if (section) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = section.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Category Tabs Rendering
  renderCategoryTabs() {
    const container = document.getElementById('category-tabs-container');
    if (!container) return;

    const categories = [
      { id: 'all', name: 'All Products', icon: 'fa-border-all' },
      { id: 'Light', name: 'Light', icon: 'fa-lightbulb' },
      { id: 'Air Purifiers', name: 'Air Purifiers', icon: 'fa-wind' },
      { id: 'Air Fryers', name: 'Air Fryers', icon: 'fa-utensils' },
      { id: 'Kitchen Appliances', name: 'Kitchen Appliances', icon: 'fa-blender' },
      { id: 'Irons & Steamers', name: 'Irons & Steamers', icon: 'fa-shirt' },
      { id: 'Coffee Makers', name: 'Coffee Makers', icon: 'fa-mug-hot' },
      { id: 'Vacuum Cleaners', name: 'Vacuum Cleaners', icon: 'fa-broom' },
      { id: 'Water Solutions', name: 'Water Solutions', icon: 'fa-glass-water' },
      { id: 'Health Monitors', name: 'Health Monitors', icon: 'fa-notes-medical' },
      { id: 'Personal Health', name: 'Personal Health', icon: 'fa-heartbeat' },
      { id: "Men's Grooming", name: "Men's Grooming", icon: 'fa-user-ninja' },
      { id: "Women's Grooming", name: "Women's Grooming", icon: 'fa-gem' },
      { id: 'Oral Care', name: 'Oral Care', icon: 'fa-tooth' },
      { id: 'Hair Care', name: 'Hair Care', icon: 'fa-scissors' },
      { id: 'Skin Care', name: 'Skin Care', icon: 'fa-spa' },
      { id: 'Shavers', name: 'Shavers', icon: 'fa-shield-halved' }
    ];

    container.innerHTML = categories.map(cat => `
      <button class="cat-tab ${cat.id === this.selectedCategory ? 'active' : ''}" onclick="app.setSubcategoryFilter('${cat.id}')">
        <i class="fa-solid ${cat.icon}"></i> ${cat.name}
      </button>
    `).join('');
  }

  // Product Grid Rendering for Category Listing Page (PLP)
  renderProducts() {
    const grid = document.getElementById('bestsellers-list');
    if (!grid) return;

    let filtered = PHILIPS_DATA.products;

    if (this.selectedCategory && this.selectedCategory !== 'all') {
      const target = this.selectedCategory.toLowerCase().trim();
      filtered = PHILIPS_DATA.products.filter(p => {
        const cat = (p.category || '').toLowerCase();
        const sub = (p.subcategory || '').toLowerCase();
        const parent = (p.parentCategory || '').toLowerCase();
        const name = (p.name || '').toLowerCase();
        return cat === target || sub === target || parent === target || cat.includes(target) || sub.includes(target) || name.includes(target);
      });
    }

    if (!filtered || filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3.5rem 1.5rem; background: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">
          <i class="fa-solid fa-box-open" style="font-size: 3rem; color: #94A3B8; margin-bottom: 1rem; display: block;"></i>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: #1E293B; margin-bottom: 0.5rem;">No Products Found in "${this.selectedCategory}"</h3>
          <p style="color: #64748B; font-size: 0.92rem; margin-bottom: 1.5rem; max-width: 480px; margin-left: auto; margin-right: auto;">We are restocking this line. Click below to view all official Philips products.</p>
          <button class="btn btn-primary btn-sm" onclick="app.setSubcategoryFilter('all')"><i class="fa-solid fa-arrow-left"></i> View All Products</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map((product, idx) => {
      const defaultVariant = product.variants ? product.variants[0] : { price: product.price, originalPrice: product.originalPrice };
      const catLabel = product.subcategory || product.parentCategory || 'Home Appliances';
      const isBulbProduct = (product.id === 'hue-smart-bulb-rgb');
      return `
        <div class="product-card reveal-on-scroll" data-delay="${(idx % 4) * 70}" data-product-id="${product.id}">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
          
          <div class="product-image-wrap" onclick="app.openQuickView('${product.id}')" style="cursor: pointer; background: #FFFFFF; padding: 1.25rem;">
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=600&q=80';" style="width: 100%; height: 160px; object-fit: contain; display: block; margin: 0 auto;">
          </div>
          
          <div class="product-content">
            <span class="product-category-name">${catLabel}</span>
            <h3 class="product-title" onclick="app.openQuickView('${product.id}')" style="cursor: pointer;">${product.name}</h3>
            
            <div class="product-rating">
              <i class="fa-solid fa-star"></i>
              <span>${product.rating || 4.8}</span>
              <span class="rating-count">(${product.reviewCount || 100} reviews)</span>
            </div>

            <div class="product-price-row">
              <span class="product-price" id="price-${product.id}">₹${defaultVariant.price.toLocaleString('en-IN')}</span>
            </div>

            <div class="product-card-actions">
              <button class="btn btn-primary btn-sm flex-grow" onclick="app.addToCart('${product.id}')">
                <i class="fa-solid fa-bag-shopping"></i> Add to Cart
              </button>
              <button class="btn btn-secondary btn-icon btn-sm" onclick="app.openQuickView('${product.id}')" title="Quick View">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.reobserveAnimations();
  }

  toggleWishlist(productId) {
    const idx = this.wishlist.indexOf(productId);
    const product = PHILIPS_DATA.products.find(p => p.id === productId);
    const name = product ? product.name : 'Product';

    if (idx > -1) {
      this.wishlist.splice(idx, 1);
      this.showToast(`Removed "${name}" from your Wishlist.`);
    } else {
      this.wishlist.push(productId);
      this.showToast(`Added "${name}" to your Wishlist! ❤️`);
    }

    try { localStorage.setItem('philips_wishlist', JSON.stringify(this.wishlist)); } catch (e) {}
    this.renderProducts();
  }
  }

  // High-Performance Scroll Intersection Observer
  initScrollAnimations() {
    this.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, parseInt(delay, 10));
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });

    this.reobserveAnimations();
  }

  reobserveAnimations() {
    if (!this.scrollObserver) return;
    document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      if (!el.classList.contains('is-visible')) {
        this.scrollObserver.observe(el);
      }
    });
  }

  handleVariantChange(event, productId) {
    const product = PHILIPS_DATA.products.find(p => p.id === productId);
    if (!product || !product.variants) return;
    
    const selectedVariant = product.variants[event.target.value];
    const priceEl = document.getElementById(`price-${productId}`);
    const origPriceEl = document.getElementById(`orig-price-${productId}`);
    
    if (priceEl) priceEl.textContent = `₹${selectedVariant.price.toLocaleString('en-IN')}`;
    if (origPriceEl && selectedVariant.originalPrice) origPriceEl.textContent = `₹${selectedVariant.originalPrice.toLocaleString('en-IN')}`;
  }

  // Quick View Detail Modal
  openQuickView(productId) {
    const product = PHILIPS_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const modalContent = document.getElementById('quickview-content');
    const overlay = document.getElementById('quickview-modal-overlay');

    if (!modalContent || !overlay) return;

    const defaultVariant = product.variants ? product.variants[0] : { price: product.price, originalPrice: product.originalPrice };

    modalContent.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;">
        <div style="background: var(--bg-light); border-radius: var(--radius-md); padding: 2rem; text-align: center;">
          <img src="${product.image}" alt="${product.name}" style="max-height: 280px; margin: 0 auto;">
        </div>
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--primary-blue); text-transform: uppercase;">${product.subcategory || product.categoryName || product.parentCategory || 'Philips Innovation'}</span>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--secondary-navy); margin: 0.4rem 0;">${product.name}</h2>
          <div class="product-rating" style="margin-bottom: 1rem;">
            <i class="fa-solid fa-star"></i> <strong>${product.rating}</strong> (${product.reviewCount} verified reviews)
          </div>
          <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.25rem;">${product.shortDescription}</p>
          
          <div style="font-size: 1.6rem; font-weight: 800; color: var(--secondary-navy); margin-bottom: 1.25rem;">
            ₹${defaultVariant.price.toLocaleString('en-IN')}
            ${defaultVariant.originalPrice ? `<span style="font-size: 1rem; color: var(--text-muted); text-decoration: line-through; margin-left: 0.5rem;">₹${defaultVariant.originalPrice.toLocaleString('en-IN')}</span>` : ''}
          </div>

          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.5rem;">Key Specifications & Features:</h4>
            <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: var(--text-dark); display: flex; flex-direction: column; gap: 0.35rem;">
              ${product.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>

          <button class="btn btn-primary btn-large" style="width: 100%;" onclick="app.addToCart('${product.id}', '${defaultVariant.name}', ${defaultVariant.price})">
            <i class="fa-solid fa-bag-shopping"></i> Add to Cart Now
          </button>
        </div>
      </div>
    `;

    overlay.classList.add('active');
  }

  // Cart Management
  addToCartFromCard(productId) {
    const product = PHILIPS_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const card = document.querySelector(`[data-product-id="${productId}"]`);
    let variantName = product.name;
    let price = product.price;

    if (card) {
      const select = card.querySelector('.variant-select');
      if (select && product.variants) {
        const v = product.variants[select.value];
        variantName = v.name;
        price = v.price;
      }
    }

    this.addToCart(productId, variantName, price);
  }

  addToCart(productId, variantName, price) {
    const existing = this.cart.find(item => item.productId === productId && item.variantName === variantName);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({ productId, variantName, price, qty: 1 });
    }

    this.saveCart();
    this.updateCartUI();
    this.openCartDrawer();
    this.showToast('Item added to your cart!');

    // Close quickview modal if open
    const quickOverlay = document.getElementById('quickview-modal-overlay');
    if (quickOverlay) quickOverlay.classList.remove('active');
  }

  updateCartQty(index, delta) {
    if (this.cart[index]) {
      this.cart[index].qty += delta;
      if (this.cart[index].qty <= 0) {
        this.cart.splice(index, 1);
      }
    }
    this.saveCart();
    this.updateCartUI();
  }

  saveCart() {
    localStorage.setItem('philips_cart', JSON.stringify(this.cart));
  }

  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.showToast('Item removed from Wishlist');
    } else {
      this.wishlist.push(productId);
      this.showToast('Item saved to your Wishlist!');
    }
    localStorage.setItem('philips_wishlist', JSON.stringify(this.wishlist));
    this.updateWishlistUI();
    this.renderProducts();
  }

  updateWishlistUI() {
    const countBadge = document.getElementById('wishlist-count');
    if (countBadge) countBadge.textContent = this.wishlist.length;
  }

  openWishlistDrawer() {
    let backdrop = document.getElementById('wishlist-drawer-backdrop');
    if (backdrop) backdrop.remove();

    backdrop = document.createElement('div');
    backdrop.id = 'wishlist-drawer-backdrop';
    backdrop.style.cssText = 'position: fixed; inset: 0; background: rgba(7,27,61,0.65); backdrop-filter: blur(4px); z-index: 20000; display: flex; justify-content: flex-end;';
    
    const itemsHTML = this.wishlist.length === 0 ? `
      <div style="padding: 3rem 1.5rem; text-align: center; color: #64748B;">
        <i class="fa-regular fa-heart" style="font-size: 3rem; color: #CBD5E1; display: block; margin-bottom: 1rem;"></i>
        <h4 style="font-size: 1.1rem; font-weight: 700; color: #1E293B;">Your Wishlist is Empty</h4>
        <p style="font-size: 0.88rem; margin-bottom: 1.5rem;">Click the heart icon on any product to save items for later.</p>
        <button onclick="document.getElementById('wishlist-drawer-backdrop').remove(); document.getElementById('bestsellers').scrollIntoView({behavior:'smooth'});" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: #0057B8; color: #FFF; font-weight: 700; border: none; cursor: pointer;">Explore Products</button>
      </div>
    ` : this.wishlist.map(id => {
      const p = PHILIPS_DATA.products.find(item => item.id === id);
      if (!p) return '';
      return `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; border-bottom: 1px solid #E2E8F0; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <img src="${p.image}" alt="${p.name}" style="width: 54px; height: 54px; object-fit: contain; background: #FFF; padding: 0.25rem; border-radius: 8px; border: 1px solid #E2E8F0;">
            <div>
              <div style="font-weight: 700; font-size: 0.9rem; color: #1E293B;">${p.name}</div>
              <div style="font-size: 0.82rem; color: #0057B8; font-weight: 800; margin-top: 0.2rem;">₹${p.price.toLocaleString('en-IN')}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button onclick="app.addToCart('${p.id}'); app.toggleWishlist('${p.id}'); document.getElementById('wishlist-drawer-backdrop').remove();" style="padding: 0.5rem 0.85rem; border-radius: 6px; background: #0057B8; color: #FFF; font-size: 0.78rem; font-weight: 700; border: none; cursor: pointer;">
              <i class="fa-solid fa-bag-shopping"></i> Add
            </button>
            <button onclick="app.toggleWishlist('${p.id}'); app.openWishlistDrawer();" style="padding: 0.5rem; border: none; background: none; color: #94A3B8; cursor: pointer; font-size: 1rem;" title="Remove">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    backdrop.innerHTML = `
      <div style="width: 100%; max-width: 420px; height: 100%; background: #FFF; display: flex; flex-direction: column; box-shadow: -8px 0 30px rgba(0,0,0,0.2); font-family: 'General Sans', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; border-bottom: 1.5px solid #F1F5F9;">
          <h3 style="font-size: 1.15rem; font-weight: 800; color: #1E293B; margin: 0;"><i class="fa-solid fa-heart" style="color: #E11D48;"></i> Saved Wishlist (${this.wishlist.length})</h3>
          <button onclick="document.getElementById('wishlist-drawer-backdrop').remove()" style="font-size: 1.25rem; border: none; background: none; cursor: pointer; color: #64748B;"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div style="flex: 1; overflow-y: auto;">
          ${itemsHTML}
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);
  }

  updateCartUI() {
    const countBadge = document.getElementById('cart-count');
    const totalItems = this.cart.reduce((sum, item) => sum + item.qty, 0);
    if (countBadge) countBadge.textContent = totalItems;

    const cartContainer = document.getElementById('cart-items-list');
    const emptyState = document.getElementById('empty-cart-state');
    const subtotalEl = document.getElementById('cart-subtotal');
    const progressFill = document.getElementById('cart-progress-fill');
    const progressText = document.getElementById('cart-progress-text');

    if (this.cart.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      if (cartContainer) cartContainer.innerHTML = '';
      if (subtotalEl) subtotalEl.textContent = '₹0';
      if (progressFill) progressFill.style.width = '0%';
      if (progressText) progressText.innerHTML = `<i class="fa-solid fa-truck-fast"></i> Add ₹499 more for Free Express Shipping`;
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    let rawSubtotal = 0;
    if (cartContainer) {
      cartContainer.innerHTML = this.cart.map((item, idx) => {
        const product = PHILIPS_DATA.products.find(p => p.id === item.productId) || { name: item.variantName, image: 'hero.png' };
        const itemTotal = item.price * item.qty;
        rawSubtotal += itemTotal;

        return `
          <li class="cart-item">
            <img src="${product.image}" alt="${product.name}" class="cart-item-img">
            <div class="cart-item-info">
              <h4 class="cart-item-title">${product.name}</h4>
              <div style="font-size: 0.78rem; color: var(--text-muted);">${item.variantName}</div>
              <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
              <div class="cart-item-qty">
                <button class="qty-btn" onclick="app.updateCartQty(${idx}, -1)">-</button>
                <span style="font-weight: 700; font-size: 0.88rem;">${item.qty}</span>
                <button class="qty-btn" onclick="app.updateCartQty(${idx}, 1)">+</button>
              </div>
            </div>
            <div style="font-weight: 800; font-size: 0.95rem;">₹${itemTotal.toLocaleString('en-IN')}</div>
          </li>
        `;
      }).join('');
    }

    let finalSubtotal = rawSubtotal;
    if (this.activeCoupon === 'PHILIPS10') {
      finalSubtotal = Math.round(rawSubtotal * 0.9);
    }

    if (subtotalEl) subtotalEl.textContent = `₹${finalSubtotal.toLocaleString('en-IN')}`;

    // Free shipping threshold (₹499)
    const freeShippingTarget = 499;
    const progressPct = Math.min(100, Math.round((rawSubtotal / freeShippingTarget) * 100));
    if (progressFill) progressFill.style.width = `${progressPct}%`;

    if (progressText) {
      if (rawSubtotal >= freeShippingTarget) {
        progressText.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--success-green);"></i> You unlocked FREE Express Doorstep Delivery!`;
      } else {
        const remaining = freeShippingTarget - rawSubtotal;
        progressText.innerHTML = `<i class="fa-solid fa-truck-fast"></i> Add ₹${remaining} more for Free Express Shipping`;
      }
    }
  }

  applyCoupon() {
    const input = document.getElementById('coupon-code-input');
    const msg = document.getElementById('coupon-applied-msg');
    if (!input || !msg) return;

    const code = input.value.trim().toUpperCase();
    if (code === 'PHILIPS10') {
      this.activeCoupon = 'PHILIPS10';
      msg.style.color = 'var(--success-green)';
      msg.textContent = 'Coupon PHILIPS10 applied! 10% Discount unlocked.';
      this.updateCartUI();
      this.showToast('10% Promo Code Applied!');
    } else {
      msg.style.color = 'var(--discount-red)';
      msg.textContent = 'Invalid promo code. Try code PHILIPS10';
    }
  }

  openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    if (drawer) drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
  }

  closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  }

  checkoutWhatsApp() {
    if (this.cart.length === 0) return;

    let text = "Hello Philips Official Support, I would like to place an order:\n\n";
    let subtotal = 0;
    this.cart.forEach((item, idx) => {
      const product = PHILIPS_DATA.products.find(p => p.id === item.productId);
      const name = product ? product.name : item.variantName;
      const total = item.price * item.qty;
      subtotal += total;
      text += `${idx + 1}. ${name} (${item.variantName}) x${item.qty} = ₹${total.toLocaleString('en-IN')}\n`;
    });

    if (this.activeCoupon === 'PHILIPS10') {
      const discount = Math.round(subtotal * 0.1);
      subtotal -= discount;
      text += `\nPromo Discount (PHILIPS10): -₹${discount.toLocaleString('en-IN')}`;
    }

    text += `\nTotal Amount: ₹${subtotal.toLocaleString('en-IN')}\nPlease confirm my delivery details and doorstep warranty registration.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
  }

  // Reviews Carousel Auto-play Slideshow
  renderReviews() {
    this.goToReview(0, false);
  }

  startReviewsAutoPlay() {
    if (this.reviewTimer) clearInterval(this.reviewTimer);
    this.reviewTimer = setInterval(() => {
      this.nextReview(false);
    }, 4000);
  }

  goToReview(index, resetTimer = true) {
    this.currentReviewIndex = index;
    const total = PHILIPS_DATA.reviews.length;
    if (!total) return;

    // Get 3 consecutive reviews starting at index
    const reviewsToShow = [
      PHILIPS_DATA.reviews[index % total],
      PHILIPS_DATA.reviews[(index + 1) % total],
      PHILIPS_DATA.reviews[(index + 2) % total]
    ];

    const slider = document.getElementById('reviews-slider');
    if (slider) {
      slider.innerHTML = `
        <div class="reviews-grid-container" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; width: 100%;">
          ${reviewsToShow.map((rev) => `
            <div class="review-card" style="background: #FFFFFF; border-radius: 20px; border: 1px solid #E2E8F0; box-shadow: 0 10px 30px rgba(0,0,0,0.04); padding: 1.85rem; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.3s ease; opacity: 0;" onmouseover="this.style.transform='translateY(-6px)'; this.style.boxShadow='0 18px 36px rgba(0,87,184,0.12)'; this.style.borderColor='#0057B8';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.04)'; this.style.borderColor='#E2E8F0';">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                  <div style="display: flex; align-items: center; gap: 0.85rem;">
                    <div style="width: 48px; height: 48px; border-radius: 50%; background: ${rev.color}; color: ${rev.textColor || '#FFF'}; font-weight: 800; font-size: 1.15rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                      ${rev.avatar}
                    </div>
                    <div>
                      <h4 style="font-size: 1.05rem; font-weight: 800; color: #1E293B; margin: 0 0 0.15rem 0;">${rev.author}</h4>
                      <span style="font-size: 0.8rem; color: #94A3B8; font-weight: 500;">${rev.meta}</span>
                    </div>
                  </div>
                  <img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" alt="Google" style="height: 20px; width: 62px; display: block; object-fit: contain; flex-shrink: 0;">
                </div>

                <div style="display: flex; align-items: center; gap: 0.25rem; margin-bottom: 1rem; color: #F59E0B; font-size: 0.95rem;">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <span style="color: #94A3B8; font-size: 0.8rem; font-weight: 500; margin-left: 0.35rem;">· ${rev.date}</span>
                </div>

                <p style="font-size: 0.95rem; color: #334155; line-height: 1.6; font-style: italic; margin: 0; font-weight: 500;">
                  "${rev.text}"
                </p>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      setTimeout(() => {
        const cards = slider.querySelectorAll('.review-card');
        cards.forEach(c => c.style.opacity = '1');
      }, 30);
    }

    const dotsContainer = document.getElementById('reviews-dots');
    if (dotsContainer) {
      dotsContainer.innerHTML = PHILIPS_DATA.reviews.map((_, idx) => `
        <span class="dot ${idx === index ? 'active' : ''}" onclick="app.goToReview(${idx})" style="${idx === index ? 'width: 24px; height: 10px; border-radius: 999px; background: #0057B8;' : 'width: 10px; height: 10px; border-radius: 50%; background: #CBD5E1;'} cursor: pointer; transition: all 0.3s ease;"></span>
      `).join('');
    }

    if (resetTimer) {
      this.startReviewsAutoPlay();
    }
  }

  nextReview(resetTimer = true) {
    this.currentReviewIndex = (this.currentReviewIndex + 1) % PHILIPS_DATA.reviews.length;
    this.goToReview(this.currentReviewIndex, resetTimer);
  }

  prevReview(resetTimer = true) {
    this.currentReviewIndex = (this.currentReviewIndex - 1 + PHILIPS_DATA.reviews.length) % PHILIPS_DATA.reviews.length;
    this.goToReview(this.currentReviewIndex, resetTimer);
  }

  // FAQs Accordion
  renderFaqs() {
    const container = document.getElementById('faq-container');
    if (!container) return;

    container.innerHTML = PHILIPS_DATA.faqs.map((faq, idx) => `
      <div class="faq-item ${idx === 0 ? 'active' : ''}">
        <button class="faq-trigger" onclick="app.toggleFaq(this)">
          ${faq.q}
          <i class="fa-solid fa-chevron-down faq-icon"></i>
        </button>
        <div class="faq-content">
          <p>${faq.a}</p>
        </div>
      </div>
    `).join('');
  }

  toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    if (item) {
      item.classList.toggle('active');
    }
  }

  // Stats Counter Animation
  renderStats() {
    const container = document.getElementById('stats-grid-container');
    if (!container) return;

    container.innerHTML = PHILIPS_DATA.stats.map(s => `
      <div class="stat-card">
        <div class="stat-number" data-target="${s.target}">0</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');
  }

  checkStatsScroll() {
    const container = document.getElementById('stats-grid-container');
    if (!container || this.statsAnimated) return;

    const rect = container.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.85) {
      this.statsAnimated = true;
      this.animateStats();
    }
  }

  animateStats() {
    document.querySelectorAll('.stat-number').forEach(el => {
      const target = parseInt(el.getAttribute('data-target'));
      let count = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        if (target >= 1000000) {
          el.textContent = (count / 1000000).toFixed(0) + 'M+';
        } else if (target >= 1000) {
          el.textContent = count.toLocaleString('en-IN') + '+';
        } else {
          el.textContent = count;
        }
      }, 30);
    });
  }

  // Toast Notification Helper
  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-cyan);"></i> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Bind Global Events
  bindEvents() {
    // Category Pills Click
    document.addEventListener('click', (e) => {
      const tabBtn = e.target.closest('[data-category-id]');
      if (tabBtn) {
        this.selectedCategory = tabBtn.getAttribute('data-category-id');
        this.renderCategoryTabs();
        this.renderProducts();
      }

      const rangeCard = e.target.closest('[data-category-select]');
      if (rangeCard) {
        this.selectedCategory = rangeCard.getAttribute('data-category-select');
        this.renderCategoryTabs();
        this.renderProducts();
        document.getElementById('bestsellers').scrollIntoView({ behavior: 'smooth' });
      }

      if (e.target.closest('#cart-toggle')) {
        this.openCartDrawer();
      }

      if (e.target.closest('#cart-close') || e.target.closest('#cart-drawer-overlay') || e.target.closest('.close-cart-link')) {
        this.closeCartDrawer();
      }

      if (e.target.closest('#apply-coupon-btn')) {
        this.applyCoupon();
      }

      if (e.target.closest('#checkout-whatsapp')) {
        this.checkoutWhatsApp();
      }

      if (e.target.closest('#rev-prev')) {
        this.prevReview();
      }

      if (e.target.closest('#rev-next')) {
        this.nextReview();
      }

      // Modals
      if (e.target.closest('.btn-open-refer-earn') || e.target.closest('#refer-link')) {
        e.preventDefault();
        document.getElementById('refer-modal-overlay').classList.add('active');
      }

      if (e.target.closest('#refer-close') || e.target.closest('#refer-modal-overlay')) {
        if (!e.target.closest('.refer-modal-card')) {
          document.getElementById('refer-modal-overlay').classList.remove('active');
        }
      }

      if (e.target.closest('#account-toggle')) {
        document.getElementById('account-modal-overlay').classList.add('active');
      }

      if (e.target.closest('#account-close') || e.target.closest('#account-modal-overlay')) {
        if (!e.target.closest('.account-modal-card')) {
          document.getElementById('account-modal-overlay').classList.remove('active');
        }
      }

      // Search Trigger
      if (e.target.closest('#search-toggle')) {
        this.openSearchModal();
      }

      if (e.target.closest('#quickview-close') || e.target.closest('#quickview-modal-overlay')) {
        if (!e.target.closest('#quickview-modal')) {
          document.getElementById('quickview-modal-overlay').classList.remove('active');
        }
      }

      // Mobile Menu
      if (e.target.closest('#mobile-menu-toggle')) {
        document.getElementById('mobile-menu').classList.add('active');
      }

      if (e.target.closest('#mobile-menu-close') || e.target.closest('.mobile-nav-link')) {
        document.getElementById('mobile-menu').classList.remove('active');
      }
    });

    // Global Keyboard ESC listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const searchBackdrop = document.getElementById('search-modal-backdrop');
        if (searchBackdrop) searchBackdrop.remove();

        const checkoutBackdrop = document.getElementById('checkout-modal-backdrop');
        if (checkoutBackdrop) checkoutBackdrop.remove();

        const orderBackdrop = document.getElementById('order-success-backdrop');
        if (orderBackdrop) orderBackdrop.remove();

        const cartOverlay = document.getElementById('cart-drawer-overlay');
        if (cartOverlay) this.closeCartDrawer();

        const quickOverlay = document.getElementById('quickview-modal-overlay');
        if (quickOverlay) quickOverlay.classList.remove('active');

        const accountOverlay = document.getElementById('account-modal-overlay');
        if (accountOverlay) accountOverlay.classList.remove('active');

        const referOverlay = document.getElementById('refer-modal-overlay');
        if (referOverlay) referOverlay.classList.remove('active');
      }
    });
  }

  // Information Architecture Search Modal
  openSearchModal() {
    let backdrop = document.getElementById('search-modal-backdrop');
    if (backdrop) backdrop.remove();

    backdrop = document.createElement('div');
    backdrop.id = 'search-modal-backdrop';
    backdrop.style.cssText = 'position: fixed; inset: 0; background: rgba(7,27,61,0.65); backdrop-filter: blur(6px); z-index: 20000; display: flex; align-items: center; justify-content: center; padding: 1.5rem;';
    backdrop.innerHTML = `
      <div style="max-width: 640px; width: 100%; background: #FFF; padding: 2rem; border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); font-family: 'General Sans', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--primary-blue); margin: 0;"><i class="fa-solid fa-magnifying-glass"></i> Search Philips Catalog</h3>
          <button onclick="document.getElementById('search-modal-backdrop').remove()" style="font-size: 1.35rem; border: none; background: none; cursor: pointer; color: var(--text-dark);"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div style="position: relative; margin-bottom: 1rem;">
          <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 1.2rem; top: 50%; transform: translateY(-50%); color: #94A3B8; font-size: 1.1rem;"></i>
          <input type="text" id="ia-search-input" placeholder="Search Air Fryer, Smart Light, Toothbrush, Shaver, Air Purifier..." style="width: 100%; padding: 0.9rem 1.25rem 0.9rem 3rem; border-radius: 999px; border: 2px solid var(--primary-blue); font-size: 0.98rem; outline: none;" autofocus>
        </div>
        <div id="search-tags" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
          <span style="font-size: 0.8rem; font-weight: 700; color: #64748B; align-self: center;">Popular:</span>
          <button onclick="document.getElementById('ia-search-input').value='Air Fryer'; document.getElementById('ia-search-input').dispatchEvent(new Event('input'));" style="padding: 0.3rem 0.75rem; border-radius: 999px; background: #F1F5F9; border: 1px solid #CBD5E1; font-size: 0.82rem; cursor: pointer; font-weight: 600;">Air Fryer</button>
          <button onclick="document.getElementById('ia-search-input').value='Smart Bulb'; document.getElementById('ia-search-input').dispatchEvent(new Event('input'));" style="padding: 0.3rem 0.75rem; border-radius: 999px; background: #F1F5F9; border: 1px solid #CBD5E1; font-size: 0.82rem; cursor: pointer; font-weight: 600;">Smart Bulb</button>
          <button onclick="document.getElementById('ia-search-input').value='Toothbrush'; document.getElementById('ia-search-input').dispatchEvent(new Event('input'));" style="padding: 0.3rem 0.75rem; border-radius: 999px; background: #F1F5F9; border: 1px solid #CBD5E1; font-size: 0.82rem; cursor: pointer; font-weight: 600;">Toothbrush</button>
          <button onclick="document.getElementById('ia-search-input').value='Shaver'; document.getElementById('ia-search-input').dispatchEvent(new Event('input'));" style="padding: 0.3rem 0.75rem; border-radius: 999px; background: #F1F5F9; border: 1px solid #CBD5E1; font-size: 0.82rem; cursor: pointer; font-weight: 600;">Shaver</button>
        </div>
        <div id="ia-search-results" style="max-height: 320px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.6rem;"></div>
      </div>
    `;
    document.body.appendChild(backdrop);

    const input = document.getElementById('ia-search-input');
    if (input) {
      input.focus();
      input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const results = document.getElementById('ia-search-results');
        if (!query) { results.innerHTML = ''; return; }
        const matches = PHILIPS_DATA.products.filter(p => p.name.toLowerCase().includes(query) || (p.subcategory && p.subcategory.toLowerCase().includes(query)) || (p.parentCategory && p.parentCategory.toLowerCase().includes(query)));
        if (matches.length === 0) {
          results.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.95rem;"><i class="fa-solid fa-box-open" style="font-size: 2rem; color: #CBD5E1; display: block; margin-bottom: 0.5rem;"></i> No Philips products found matching '${query}'</div>`;
          return;
        }
        results.innerHTML = matches.map(p => `
          <div onclick="app.openQuickView('${p.id}'); document.getElementById('search-modal-backdrop').remove();" style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem; border-radius: 10px; background: #F8FAFC; cursor: pointer; border: 1px solid #E2E8F0; transition: all 0.2s ease;">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <img src="${p.image}" alt="${p.name}" style="width: 52px; height: 52px; object-fit: contain; background: #FFF; padding: 0.35rem; border-radius: 8px;">
              <div>
                <div style="font-weight: 700; font-size: 0.92rem; color: #1E293B;">${p.name}</div>
                <div style="font-size: 0.82rem; color: var(--primary-blue); font-weight: 800; margin-top: 0.2rem;">₹${p.price.toLocaleString('en-IN')} <span style="color: #64748B; font-weight: 500;">(${p.subcategory})</span></div>
              </div>
            </div>
            <span style="font-size: 0.82rem; font-weight: 700; color: #0057B8; background: #EBF5FF; padding: 0.3rem 0.75rem; border-radius: 999px;">View Item <i class="fa-solid fa-arrow-right"></i></span>
          </div>
        `).join('');
      });
    }
  }

  // Interactive Checkout Flow
  openCheckoutModal() {
    if (this.cart.length === 0) {
      this.showToast('Your shopping cart is empty! Add products before checkout.');
      return;
    }

    this.closeCartDrawer();

    let backdrop = document.getElementById('checkout-modal-backdrop');
    if (backdrop) backdrop.remove();

    let rawSubtotal = this.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    let discount = this.activeCoupon === 'PHILIPS10' ? Math.round(rawSubtotal * 0.1) : 0;
    let finalTotal = rawSubtotal - discount;

    backdrop = document.createElement('div');
    backdrop.id = 'checkout-modal-backdrop';
    backdrop.style.cssText = 'position: fixed; inset: 0; background: rgba(7,27,61,0.7); backdrop-filter: blur(6px); z-index: 20000; display: flex; align-items: center; justify-content: center; padding: 1rem; overflow-y: auto;';
    backdrop.innerHTML = `
      <div style="max-width: 660px; width: 100%; max-height: 90vh; overflow-y: auto; background: #FFF; padding: 2rem; border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); font-family: 'General Sans', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #F1F5F9; padding-bottom: 1rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="images/philips_official_logo.png" alt="Philips" style="height: 32px;">
            <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--secondary-navy); margin: 0;">Express Doorstep Checkout</h3>
          </div>
          <button onclick="document.getElementById('checkout-modal-backdrop').remove()" style="font-size: 1.35rem; border: none; background: none; cursor: pointer; color: var(--text-dark);"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <form id="checkout-form" onsubmit="event.preventDefault(); app.placeOrder();">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="font-size: 0.85rem; font-weight: 700; color: #334155; display: block; margin-bottom: 0.35rem;">Full Name *</label>
              <input type="text" required placeholder="e.g. Rahul Sharma" style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1.5px solid #CBD5E1; font-size: 0.9rem; outline: none;">
            </div>
            <div>
              <label style="font-size: 0.85rem; font-weight: 700; color: #334155; display: block; margin-bottom: 0.35rem;">Mobile Number *</label>
              <input type="tel" required placeholder="+91 98765 43210" style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1.5px solid #CBD5E1; font-size: 0.9rem; outline: none;">
            </div>
          </div>

          <div style="margin-bottom: 1rem;">
            <label style="font-size: 0.85rem; font-weight: 700; color: #334155; display: block; margin-bottom: 0.35rem;">Delivery Address *</label>
            <input type="text" required placeholder="Flat/House No., Street, Area, Landmark" style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1.5px solid #CBD5E1; font-size: 0.9rem; outline: none; margin-bottom: 0.5rem;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <input type="text" required placeholder="City" style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1.5px solid #CBD5E1; font-size: 0.9rem; outline: none;">
              <input type="text" required placeholder="PIN Code" style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1.5px solid #CBD5E1; font-size: 0.9rem; outline: none;">
            </div>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="font-size: 0.85rem; font-weight: 700; color: #334155; display: block; margin-bottom: 0.5rem;">Select Payment Method *</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <label style="display: flex; align-items: center; gap: 0.6rem; padding: 0.85rem; border: 1.5px solid #0057B8; border-radius: 8px; background: #F0F6FF; cursor: pointer; font-weight: 700; font-size: 0.88rem; color: #0057B8;">
                <input type="radio" name="payment_method" value="upi" checked style="accent-color: #0057B8;">
                <i class="fa-solid fa-mobile-screen-button"></i> UPI / GPay / PhonePe
              </label>
              <label style="display: flex; align-items: center; gap: 0.6rem; padding: 0.85rem; border: 1.5px solid #CBD5E1; border-radius: 8px; background: #FFF; cursor: pointer; font-weight: 700; font-size: 0.88rem; color: #334155;">
                <input type="radio" name="payment_method" value="cod" style="accent-color: #0057B8;">
                <i class="fa-solid fa-hand-holding-dollar"></i> Cash on Delivery
              </label>
            </div>
          </div>

          <!-- Order Summary Breakdown -->
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 1.25rem; border-radius: 12px; margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.5rem; color: #64748B;">
              <span>Subtotal (${this.cart.reduce((s, i) => s + i.qty, 0)} items)</span>
              <span>₹${rawSubtotal.toLocaleString('en-IN')}</span>
            </div>
            ${discount > 0 ? `
              <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--success-green); font-weight: 700;">
                <span>Promo Code (PHILIPS10 - 10% OFF)</span>
                <span>-₹${discount.toLocaleString('en-IN')}</span>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--success-green); font-weight: 700;">
              <span>Doorstep Delivery</span>
              <span>FREE</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 1.15rem; font-weight: 800; color: var(--secondary-navy); border-top: 1.5px solid #E2E8F0; padding-top: 0.75rem; margin-top: 0.5rem;">
              <span>Total Payable</span>
              <span>₹${finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button type="submit" style="width: 100%; padding: 1.1rem; border-radius: 10px; background: #0057B8; color: #FFF; font-weight: 800; font-size: 1.05rem; border: none; cursor: pointer; box-shadow: 0 8px 24px rgba(0, 87, 184, 0.35);">
            <i class="fa-solid fa-lock"></i> Place Order (₹${finalTotal.toLocaleString('en-IN')})
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(backdrop);
  }

  placeOrder() {
    const backdrop = document.getElementById('checkout-modal-backdrop');
    if (backdrop) backdrop.remove();

    const orderId = 'PH-' + Math.floor(100000 + Math.random() * 900000);
    this.cart = [];
    this.saveCart();
    this.updateCartUI();

    let successBackdrop = document.createElement('div');
    successBackdrop.id = 'order-success-backdrop';
    successBackdrop.style.cssText = 'position: fixed; inset: 0; background: rgba(7,27,61,0.75); backdrop-filter: blur(6px); z-index: 20000; display: flex; align-items: center; justify-content: center; padding: 1.5rem;';
    successBackdrop.innerHTML = `
      <div style="max-width: 500px; width: 100%; background: #FFF; padding: 2.5rem; border-radius: 20px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.3); font-family: 'General Sans', sans-serif;">
        <div style="width: 72px; height: 72px; border-radius: 50%; background: #E6F4EA; color: #137333; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 1.25rem auto;">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--secondary-navy); margin-bottom: 0.5rem;">Order Placed Successfully!</h2>
        <p style="font-size: 0.95rem; color: #64748B; margin-bottom: 1.25rem;">Order Reference ID: <strong style="color: #0057B8;">${orderId}</strong></p>
        <p style="font-size: 0.9rem; color: #475569; margin-bottom: 1.75rem; line-height: 1.5;">Thank you for shopping with Philips Official Store. Your order details and 2-year warranty card have been sent to your mobile number.</p>
        <button onclick="document.getElementById('order-success-backdrop').remove()" style="width: 100%; padding: 1rem; border-radius: 10px; background: #0057B8; color: #FFF; font-weight: 800; font-size: 1rem; border: none; cursor: pointer;">
          Continue Shopping
        </button>
      </div>
    `;
    document.body.appendChild(successBackdrop);
  }

  openProfileModal() {
    const accountModal = document.getElementById('account-modal-overlay');
    if (accountModal) accountModal.classList.add('active');
  }

  showSupportModal(optionName) {
    this.showToast(`Support > ${optionName}: Directing to Philips Service Portal...`, 'info');
    const faq = document.getElementById('faq');
    if (faq) faq.scrollIntoView({ behavior: 'smooth' });
  }
}

// Initialize Application when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new PhilipsApp();
});
