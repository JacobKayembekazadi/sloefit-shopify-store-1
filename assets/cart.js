/**
 * AJAX Cart functionality for Shopify Online Store 2.0
 */

class CartDrawer {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadCart();
  }

  setupEventListeners() {
    // Add to cart buttons
    document.addEventListener('submit', (e) => {
      if (e.target.matches('form[action*="/cart/add"]')) {
        e.preventDefault();
        this.addToCart(e.target);
      }
    });

    // Cart item quantity updates
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-cart-item-increase]')) {
        e.preventDefault();
        const button = e.target.closest('[data-cart-item-increase]');
        const itemKey = button.dataset.itemKey;
        this.updateItemQuantity(itemKey, 'increase');
      }

      if (e.target.closest('[data-cart-item-decrease]')) {
        e.preventDefault();
        const button = e.target.closest('[data-cart-item-decrease]');
        const itemKey = button.dataset.itemKey;
        this.updateItemQuantity(itemKey, 'decrease');
      }

      if (e.target.closest('[data-cart-item-remove]')) {
        e.preventDefault();
        const button = e.target.closest('[data-cart-item-remove]');
        const itemKey = button.dataset.itemKey;
        this.removeItem(itemKey);
      }
    });
  }

  async addToCart(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton?.textContent;

    // Disable button and show loading state
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Adding...';
    }

    try {
      const response = await fetch(window.routes.cart_add_url, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.description || data.message || window.cartStrings.error);
      }

      // Reload cart drawer
      await this.loadCart();

      // Open cart drawer
      const cartDrawer = document.getElementById('cart-drawer');
      if (cartDrawer) {
        cartDrawer.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }

      // Show success message (optional)
      this.showNotification('Item added to cart', 'success');

    } catch (error) {
      this.showNotification(error.message || window.cartStrings.error, 'error');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
  }

  async updateItemQuantity(itemKey, action) {
    const cartItem = document.querySelector(`[data-cart-item][data-item-key="${itemKey}"]`);
    const quantityElement = cartItem?.querySelector('[data-cart-item-quantity]');
    const currentQuantity = parseInt(quantityElement?.textContent || '0');

    let newQuantity = currentQuantity;
    if (action === 'increase') {
      newQuantity = currentQuantity + 1;
    } else if (action === 'decrease') {
      newQuantity = Math.max(0, currentQuantity - 1);
    }

    if (newQuantity === 0) {
      await this.removeItem(itemKey);
      return;
    }

    try {
      const response = await fetch(window.routes.cart_change_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: itemKey,
          quantity: newQuantity
        })
      });

      if (!response.ok) {
        throw new Error(window.cartStrings.error);
      }

      const data = await response.json();

      // Handle HTML response (Shopify sometimes returns HTML for errors)
      if (response.headers.get('content-type')?.includes('text/html')) {
        throw new Error(window.cartStrings.error);
      }

      if (data.status && data.status !== 200) {
        throw new Error(data.description || data.message || window.cartStrings.error);
      }

      await this.loadCart();
    } catch (error) {
      this.showNotification(error.message || window.cartStrings.error, 'error');
    }
  }

  async removeItem(itemKey) {
    try {
      const response = await fetch(window.routes.cart_change_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: itemKey,
          quantity: 0
        })
      });

      if (!response.ok) {
        throw new Error(window.cartStrings.error);
      }

      const data = await response.json();

      // Handle HTML response
      if (response.headers.get('content-type')?.includes('text/html')) {
        throw new Error(window.cartStrings.error);
      }

      if (data.status && data.status !== 200) {
        throw new Error(data.description || data.message || window.cartStrings.error);
      }

      await this.loadCart();
    } catch (error) {
      this.showNotification(error.message || window.cartStrings.error, 'error');
    }
  }

  async loadCart() {
    try {
      const response = await fetch(window.routes.cart_url + '.js');
      const cart = await response.json();

      // Update cart count
      this.updateCartCount(cart.item_count);

      // Update cart drawer content
      await this.updateCartDrawer(cart);

      // Update cart total
      const totalElement = document.getElementById('cart-drawer-total');
      if (totalElement) {
        const totalPrice = cart.total_price || cart.items_subtotal_price || 0;
        totalElement.textContent = this.formatMoney(totalPrice);
      }

    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  async updateCartDrawer(cart) {
    const cartDrawerContent = document.getElementById('cart-drawer-content');
    if (!cartDrawerContent) return;

    if (cart.item_count === 0) {
      cartDrawerContent.innerHTML = `
        <div class="flex flex-col items-center justify-center py-12 text-center">
          <p class="text-muted-foreground mb-4">Your cart is empty</p>
          <a
            href="/collections/all"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
          >
            Continue Shopping
          </a>
        </div>
      `;
      return;
    }

      let itemsHTML = '<div class="space-y-4">';
      cart.items.forEach(item => {
        const itemKey = item.key || item.id;
        const imageUrl = item.image || (item.featured_image ? item.featured_image.url : '');
        const productTitle = item.product_title || item.title || '';
        const variantTitle = item.variant_title || '';
        const finalPrice = item.final_price || item.line_price || 0;
        const quantity = item.quantity || 0;
        const itemUrl = item.url || item.product_url || '#';
        
        itemsHTML += `
        <div class="flex gap-4 p-4 border border-border rounded-lg bg-card" data-cart-item data-item-key="${itemKey}">
          ${imageUrl ? `<a href="${itemUrl}" class="flex-shrink-0"><img src="${imageUrl}" alt="${this.escapeHtml(productTitle)}" class="w-20 h-20 object-cover rounded" loading="lazy"></a>` : ''}
          <div class="flex-1 min-w-0">
            <a href="${itemUrl}" class="font-bold hover:text-primary transition-colors">${this.escapeHtml(productTitle)}</a>
            ${variantTitle && variantTitle !== 'Default Title' ? `<p class="text-sm text-muted-foreground">${this.escapeHtml(variantTitle)}</p>` : ''}
            <p class="font-bold mt-1">${this.formatMoney(finalPrice)}</p>
            <div class="flex items-center gap-2 mt-2">
              <button
                type="button"
                class="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-accent transition-colors"
                data-cart-item-decrease
                data-item-key="${itemKey}"
                aria-label="Decrease quantity"
              >
                <i data-lucide="minus" class="h-4 w-4" aria-hidden="true"></i>
              </button>
              <span class="w-8 text-center" data-cart-item-quantity>${quantity}</span>
              <button
                type="button"
                class="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-accent transition-colors"
                data-cart-item-increase
                data-item-key="${itemKey}"
                aria-label="Increase quantity"
              >
                <i data-lucide="plus" class="h-4 w-4" aria-hidden="true"></i>
              </button>
              <button
                type="button"
                class="ml-auto text-sm text-muted-foreground hover:text-destructive transition-colors"
                data-cart-item-remove
                data-item-key="${itemKey}"
                aria-label="Remove item"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      `;
      });
      itemsHTML += '</div>';

    cartDrawerContent.innerHTML = itemsHTML;

    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  updateCartCount(count) {
    const cartCountBubble = document.getElementById('cart-count-bubble');
    const cartCountText = document.getElementById('cart-count-text');

    if (cartCountBubble) {
      if (count > 0) {
        cartCountBubble.textContent = count;
        cartCountBubble.classList.remove('hidden');
      } else {
        cartCountBubble.classList.add('hidden');
      }
    }

    if (cartCountText) {
      cartCountText.textContent = count;
    }

    // Update cart count in cart page if it exists
    const cartPageCount = document.querySelector('[data-cart-item-count]');
    if (cartPageCount) {
      cartPageCount.textContent = count;
    }
  }

  formatMoney(cents) {
    return new Intl.NumberFormat(document.documentElement.lang || 'en', {
      style: 'currency',
      currency: window.Shopify?.currency?.active || 'USD'
    }).format(cents / 100);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-primary text-primary-foreground' : 'bg-destructive text-destructive-foreground'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Initialize cart drawer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.cartDrawer = new CartDrawer();
  });
} else {
  window.cartDrawer = new CartDrawer();
}

