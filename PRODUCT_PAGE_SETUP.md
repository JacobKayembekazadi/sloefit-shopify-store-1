# Online Store 2.0 Product Page Setup Guide

## 📋 Overview

This theme includes a complete Online Store 2.0 product page system with three main sections:

1. **Main Product** (`sections/main-product.liquid`) - Main product information and purchase options
2. **Product Recommendations** (`sections/product-recommendations.liquid`) - Related products
3. **Product Extra Content** (`sections/product-extra-content.liquid`) - Story, FAQs, ingredients, usage instructions

## 🎯 Features

### Main Product Section Includes:
- ✅ Product title, price, compare-at price
- ✅ Tax and shipping text (configurable)
- ✅ Variant selectors (dropdowns)
- ✅ Quantity selector with +/- buttons
- ✅ Add to Cart and Buy Now buttons
- ✅ Media gallery with images and video support
- ✅ Thumbnail navigation
- ✅ Image zoom functionality
- ✅ Short benefits list (bullet points)
- ✅ Full product description
- ✅ Trust badges (configurable)
- ✅ Stock messaging (in stock, low stock, sold out, backorder)
- ✅ Product meta (SKU, vendor, tags)
- ✅ Dynamic variant updates (price, availability, images, SKU)

### Product Recommendations Section:
- ✅ Automatically shows related products
- ✅ Configurable heading and description
- ✅ Configurable number of products to show (2-8)

### Product Extra Content Section:
- ✅ Story blocks (with image support)
- ✅ FAQ blocks (up to 5 questions)
- ✅ Ingredients blocks
- ✅ Usage instructions blocks
- ✅ Custom content blocks

## 🚀 Setting Up the Product Page

### Step 1: Set as Default Template

1. Go to **Shopify Admin** → **Online Store** → **Themes**
2. Click **Customize** on your theme
3. Go to any product page
4. Click on the **Theme settings** icon (gear icon) in the top bar
5. Under **Templates**, ensure `product.json` is selected as the default
6. If it's not, click **Add template** and select `product.json`

### Step 2: Preview with a Real Product

1. In the theme customizer, navigate to a product page
2. Click the **View** button (eye icon) in the top bar
3. Select a product from your store to preview
4. Alternatively, go to **Products** → Select a product → Click **Preview** → Select your theme

### Step 3: Configure Product Page Settings

1. In the theme customizer on a product page
2. Click on any section to configure its settings
3. Use the settings panels to customize:
   - Trust badges
   - Stock messaging
   - Benefits list
   - Shipping text
   - And more

## ⚙️ Configuration Options

### Main Product Section Settings

#### Product Information
- **Show vendor**: Display product vendor
- **Show quantity selector**: Show quantity input with +/- buttons
- **Show product meta**: Show SKU, vendor, tags
- **Show SKU**: Display product SKU
- **Show product tags**: Display product tags

#### Pricing
- **Show tax text**: Display tax information
- **Show shipping text**: Display shipping information
- **Shipping text**: Custom shipping message

#### Media
- **Enable image zoom**: Allow image zoom on hover/click

#### Trust Badges
- **Show trust badges**: Display trust badge section
- **Trust badge 1-3**: Icon and text for up to 3 badges

#### Benefits
- **Show benefits list**: Display benefits block
- **Benefits**: Add benefit items via blocks

#### Stock Messaging
- **Show stock message**: Display stock status
- **Low stock threshold**: Quantity threshold for low stock warning (1-20)

#### Description
- **Show full description**: Display full product description below

#### Buttons
- **Show buy now button**: Display Shopify Pay button

### Product Recommendations Section Settings

- **Heading**: Section heading (default: "You may also like")
- **Description**: Optional description text
- **Products to show**: Number of recommendations (2-8)

### Product Extra Content Section Settings

Add multiple content blocks:
- **Story**: Brand story with image
- **FAQ**: Up to 5 questions and answers
- **Ingredients**: Ingredients list and information
- **Usage**: Usage instructions
- **Custom**: Custom content block

## 📝 Adding Benefits to Products

1. In the theme customizer, select the **Main Product** section
2. Click **Add block** → **Benefit**
3. Enter the benefit text
4. Repeat for additional benefits
5. Reorder blocks by dragging

## 🎨 Customizing Trust Badges

1. In the theme customizer, select the **Main Product** section
2. Enable **Show trust badges**
3. Upload icons for each badge (optional)
4. Enter text for each badge
5. Common examples:
   - "Free shipping"
   - "30-day returns"
   - "Secure checkout"
   - "Money-back guarantee"

## 📦 Stock Messaging

The product page automatically displays stock status based on inventory:

- **In Stock**: Green text when inventory > low stock threshold
- **Low Stock**: Orange text when inventory ≤ low stock threshold
- **Sold Out**: Red text when inventory = 0 and inventory policy = "deny"
- **Backorder**: Gray text when inventory = 0 and inventory policy = "continue"

Configure the low stock threshold in section settings (default: 10).

## 🖼️ Media Gallery Features

### Supported Media Types:
- **Images**: Full image gallery support
- **Videos**: Video media support with controls

### Features:
- Main image/video display
- Thumbnail navigation
- Click thumbnail to change main media
- Image zoom (if enabled)
- Variant-specific images (automatically updates when variant changes)

## 🔄 Variant Selection

The product page includes dynamic variant selection:

- **Dropdown selectors**: One dropdown per product option
- **Automatic updates**: Price, availability, images, SKU update automatically
- **Visual feedback**: Button states change based on availability
- **Stock messaging**: Updates based on selected variant

## 🛒 Add to Cart Functionality

The product page integrates with the theme's AJAX cart system:

- **AJAX add to cart**: No page reload required
- **Cart drawer**: Opens automatically after adding to cart
- **Error handling**: Displays errors if add to cart fails
- **Quantity support**: Respects quantity selector

## 📱 Responsive Design

The product page is fully responsive:

- **Mobile**: Single column layout, stacked media and info
- **Tablet**: Two column layout
- **Desktop**: Full two column layout with optimized spacing

## 🔧 Advanced Customization

### Customizing the Product Form

The product form uses Shopify's standard `form 'product'` helper, which automatically:
- Handles variant selection
- Manages quantity
- Submits to `/cart/add`
- Works with AJAX cart (intercepted by `cart.js`)

### Adding Custom Blocks

You can add custom blocks to the Product Extra Content section:

1. In the section schema, add a new block type
2. Add settings for the block
3. Add the block rendering logic in the Liquid template
4. Use `block.shopify_attributes` for block editing support

## ✅ Best Practices

1. **Always use Shopify's product object**: Never hard-code product data
2. **Use translation keys**: All text uses `{{ 'products.product.key' | t }}` for localization
3. **Schema-driven**: All toggles and settings are managed via schema
4. **Accessibility**: All interactive elements have proper ARIA labels
5. **Performance**: Images are lazy-loaded and optimized
6. **SEO**: Proper heading hierarchy and meta information

## 🐛 Troubleshooting

### Product page not showing
- Ensure `product.json` is set as the default template
- Check that the product has at least one variant
- Verify the product is published and available

### Variants not updating
- Check browser console for JavaScript errors
- Ensure all variant options are properly configured
- Verify product has variants with different options

### Images not loading
- Check that product has media uploaded
- Verify image URLs are correct
- Check browser console for 404 errors

### Add to cart not working
- Ensure `cart.js` is loaded in the theme
- Check that AJAX cart is enabled
- Verify product is in stock and available

## 📚 Additional Resources

- [Shopify Online Store 2.0 Documentation](https://shopify.dev/themes/architecture)
- [Product Object Documentation](https://shopify.dev/api/liquid/objects/product)
- [Form Helpers Documentation](https://shopify.dev/api/liquid/tags/form)

## 🎉 Summary

The product page is fully configured and ready to use. Simply:

1. Set `product.json` as the default template
2. Configure settings in the theme customizer
3. Add benefits, trust badges, and extra content as needed
4. Preview with a real product to test functionality

All features are schema-driven and can be customized without editing code!



