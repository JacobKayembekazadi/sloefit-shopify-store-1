/**
 * Wishlist functionality using localStorage
 */

class Wishlist {
  constructor() {
    this.storageKey = 'sloe_fit_wishlist';
    this.wishlist = this.loadWishlist();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateWishlistButtons();
  }

  loadWishlist() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error loading wishlist:', e);
      return [];
    }
  }

  saveWishlist() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.wishlist));
      this.updateWishlistButtons();
      this.dispatchWishlistUpdate();
    } catch (e) {
      console.error('Error saving wishlist:', e);
    }
  }

  addProduct(productId) {
    if (!this.isInWishlist(productId)) {
      this.wishlist.push(productId);
      this.saveWishlist();
      this.showNotification('Added to wishlist', 'success');
    }
  }

  removeProduct(productId) {
    this.wishlist = this.wishlist.filter(id => id !== productId);
    this.saveWishlist();
    this.showNotification('Removed from wishlist', 'info');
  }

  toggleProduct(productId) {
    if (this.isInWishlist(productId)) {
      this.removeProduct(productId);
    } else {
      this.addProduct(productId);
    }
  }

  isInWishlist(productId) {
    return this.wishlist.includes(String(productId));
  }

  getWishlist() {
    return this.wishlist;
  }

  getWishlistCount() {
    return this.wishlist.length;
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      const wishlistButton = e.target.closest('[data-wishlist-toggle]');
      if (wishlistButton) {
        e.preventDefault();
        const productId = wishlistButton.dataset.productId;
        if (productId) {
          this.toggleProduct(productId);
          this.updateButtonState(wishlistButton, productId);
        }
      }
    });
  }

  updateWishlistButtons() {
    const buttons = document.querySelectorAll('[data-wishlist-toggle]');
    buttons.forEach(button => {
      const productId = button.dataset.productId;
      if (productId) {
        this.updateButtonState(button, productId);
      }
    });

    // Update wishlist count if element exists
    const countElement = document.querySelector('[data-wishlist-count]');
    if (countElement) {
      countElement.textContent = this.getWishlistCount();
    }
  }

  updateButtonState(button, productId) {
    const icon = button.querySelector('i[data-lucide="heart"]') || button.querySelector('i[data-lucide="heart-filled"]');
    if (icon) {
      if (this.isInWishlist(productId)) {
        button.classList.add('text-primary', 'fill-primary');
        button.classList.remove('text-muted-foreground');
        icon.setAttribute('data-lucide', 'heart');
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      } else {
        button.classList.remove('text-primary', 'fill-primary');
        button.classList.add('text-muted-foreground');
        icon.setAttribute('data-lucide', 'heart');
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    }
  }

  dispatchWishlistUpdate() {
    document.dispatchEvent(new CustomEvent('wishlist:updated', {
      detail: { wishlist: this.wishlist }
    }));
  }

  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Initialize wishlist when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.wishlist = new Wishlist();
  });
} else {
  window.wishlist = new Wishlist();
}



