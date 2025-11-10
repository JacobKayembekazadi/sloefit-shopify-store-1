# Localizing Lucide Icons

This theme currently uses Lucide icons from a CDN. To improve performance and reduce external dependencies, you can localize the icons.

## Option 1: Use SVG Icon Snippets (Recommended)

We've created SVG icon snippets for commonly used icons in the `snippets/` directory:
- `icon-menu.liquid`
- `icon-x.liquid`
- `icon-search.liquid`
- `icon-heart.liquid`
- `icon-shopping-bag.liquid`
- `icon-user.liquid`
- `icon-plus.liquid`
- `icon-minus.liquid`
- `icon-maximize.liquid`

To use these instead of Lucide:

1. Replace `<i data-lucide="icon-name"></i>` with `{% render 'icon-icon-name' %}`
2. Remove the Lucide script from `layout/theme.liquid`

## Option 2: Download and Host Lucide Icons Locally

1. Download the Lucide icons library:
   ```bash
   npm install lucide
   ```

2. Copy the icons you need from `node_modules/lucide/dist/icons/` to `assets/icons/`

3. Create a JavaScript file to initialize icons:
   ```javascript
   // assets/icons.js
   import { createIcons, icons } from 'lucide';
   createIcons({ icons });
   ```

4. Update `layout/theme.liquid` to load your local icons file instead of the CDN.

## Option 3: Use Icon Font

1. Generate an icon font from the SVG icons
2. Add the font files to `assets/`
3. Create a CSS file to define icon classes
4. Update the theme to use icon classes instead of Lucide

## Current Implementation

The theme currently uses Lucide from CDN with deferred loading. This is acceptable for development but should be localized for production.

To disable Lucide and use SVG snippets only:
1. Comment out or remove the Lucide script in `layout/theme.liquid`
2. Update all `data-lucide` attributes to use `{% render 'icon-*' %}` snippets
3. Test all icon functionality

## Icon Usage Examples

### Before (Lucide):
```liquid
<i data-lucide="menu" class="h-5 w-5"></i>
```

### After (SVG Snippet):
```liquid
{% render 'icon-menu', class: 'h-5 w-5' %}
```

## Adding New Icons

1. Visit [Lucide Icons](https://lucide.dev/icons/)
2. Find the icon you need
3. Copy the SVG code
4. Create a new snippet file: `snippets/icon-{name}.liquid`
5. Paste the SVG code and add the `class` parameter support

Example:
```liquid
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="{{ class }}">
  <!-- SVG paths here -->
</svg>
```



