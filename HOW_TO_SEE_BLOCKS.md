# How to See Product Page Blocks in Shopify Theme Editor

## Quick Fix

The blocks ARE configured correctly. They should appear when you **click on "Product Information"** in the theme editor.

## Step-by-Step Instructions

### 1. Navigate to Product Page
1. Go to **Shopify Admin** → **Online Store** → **Themes**
2. Click **Customize**
3. At the top, click the dropdown that says **"Homepage"** or current page
4. Select **"Products"** → Then select any product from the list
5. You should now be viewing a product page

### 2. Find the Section
1. In the **left sidebar**, look for **"Template"** section
2. Under "Template", you should see **"Product Information"**
3. This is the `main-product` section

### 3. View Blocks
1. **Click on "Product Information"** (the section name itself)
2. The section should **expand** to show:
   - Section settings at the top
   - **Blocks list** below the settings
   - **"Add block"** button at the bottom

### 4. Blocks Should Appear
When you click on "Product Information", you should see blocks listed like:
- 📦 Title
- 💰 Price  
- 🎨 Variant Picker
- 🔢 Quantity Selector
- 🛒 Buy Buttons
- ✅ Trust Badges
- 📝 Description
- 📑 Ingredients Tab (Collapsible Tab)
- 📑 Brewing Tab (Collapsible Tab)
- 🔗 Share Buttons

### 5. If Blocks Don't Show
If blocks still don't appear after clicking:

1. **Scroll down** in the left sidebar - blocks might be below the settings
2. **Look for "Add block" button** - click it to see available blocks
3. **Check if section is collapsed** - click the arrow/chevron to expand
4. **Refresh the page** - sometimes Shopify needs a refresh

## Visual Guide

```
Theme Editor Left Sidebar:
│
├── Header
│   └── Header section
│
├── Template  ← Click to expand
│   ├── Product Information  ← CLICK HERE to see blocks
│   │   ├── [Section Settings]
│   │   ├── 📦 Title block  ← Blocks appear here
│   │   ├── 💰 Price block
│   │   ├── 🎨 Variant Picker block
│   │   ├── 🔢 Quantity Selector block
│   │   ├── 🛒 Buy Buttons block
│   │   ├── ✅ Trust Badges block
│   │   ├── 📝 Description block
│   │   ├── 📑 Ingredients Tab block
│   │   ├── 📑 Brewing Tab block
│   │   ├── 🔗 Share Buttons block
│   │   └── [+ Add block] button
│   │
│   ├── Product Recommendations section
│   └── Product Rich Text section
│
└── Footer
    └── Footer section
```

## Troubleshooting

### Blocks Still Not Visible?

1. **Click "Add block"** button
   - If you see blocks in the dropdown, they're working
   - Add them manually if needed

2. **Check Template**
   - Ensure you're viewing `product.json` template
   - Not a custom template

3. **Clear Cache**
   - Save theme
   - Close customizer
   - Reopen customizer
   - Navigate back to product page

4. **Verify Files**
   - `templates/product.json` exists
   - `sections/main-product.liquid` exists
   - Both files are saved

## Expected Behavior

✅ **Correct**: Click "Product Information" → Blocks appear as nested items
❌ **Wrong**: "Product Information" shows as single non-expandable item

## If Nothing Works

1. **Manual Block Addition**:
   - Click "Add block" under "Product Information"
   - Add blocks one by one:
     - Title
     - Price
     - Variant Picker
     - Quantity Selector
     - Buy Buttons
     - Trust Badges
     - Description
     - Collapsible Tab (Ingredients)
     - Collapsible Tab (Brewing)
     - Share Buttons

2. **Verify Schema**:
   - Blocks are defined in `sections/main-product.liquid` schema
   - Blocks are defined in `templates/product.json`
   - Both match

3. **Check Browser Console**:
   - Open browser developer tools
   - Look for JavaScript errors
   - Look for Liquid errors

## Notes

- Blocks ARE configured correctly in the code
- Blocks should appear automatically when template loads
- If they don't show, use "Add block" to add them manually
- Once added, blocks will be saved and appear automatically next time
- Blocks can be reordered by dragging
- Blocks can be removed and re-added

## Contact

If blocks still don't appear after all these steps, the issue might be:
- Theme cache issue (try refreshing)
- Browser cache issue (try different browser)
- Shopify platform issue (contact Shopify support)


