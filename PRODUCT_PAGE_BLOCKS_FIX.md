# Product Page Blocks Not Showing - Fix Guide

## Issue
Blocks are not visible in Shopify Theme Editor under "Product Information" section.

## Root Cause
Blocks are properly defined in the schema and template JSON, but Shopify may not be displaying them due to:
1. Theme cache needs to be cleared
2. Template needs to be set as default
3. Blocks need to be properly saved in settings_data.json

## Solution Steps

### Step 1: Verify Template is Active
1. Go to **Shopify Admin** → **Online Store** → **Themes**
2. Click **Customize** on your theme
3. Navigate to a **product page**
4. Check the top dropdown - ensure you're viewing a product, not the homepage

### Step 2: Check Template Selection
1. In the theme customizer, look at the top bar
2. Click on **"Default product"** or the template name
3. Ensure `product.json` template is selected
4. If not, go to **Products** → Select a product → **Theme templates** → Select `product`

### Step 3: Expand the Section
1. In the left sidebar, find **"Template"** section
2. Under it, you should see **"Product Information"** (this is the `main-product` section)
3. **Click on "Product Information"** to expand it
4. Blocks should appear as nested items below it

### Step 4: Refresh Theme Editor
1. **Save** any changes in the theme editor
2. **Close** the theme customizer
3. **Reopen** the theme customizer
4. Navigate back to a product page
5. Check if blocks are now visible

### Step 5: Verify Blocks in Settings
1. In the theme customizer, click on **"Product Information"** section
2. Scroll down in the left sidebar
3. You should see blocks listed:
   - Title
   - Price
   - Variant Picker
   - Quantity Selector
   - Buy Buttons
   - Trust Badges
   - Description
   - Ingredients Tab (Collapsible Tab)
   - Brewing Tab (Collapsible Tab)
   - Share Buttons

### Step 6: If Blocks Still Don't Show
1. **Click "Add block"** button (blue plus icon) under "Product Information"
2. You should see a dropdown with available blocks:
   - Title
   - Price
   - Variant Picker
   - Quantity Selector
   - Buy Buttons
   - Trust Badges
   - Description
   - Collapsible Tab
   - Share Buttons

3. If the blocks are in the dropdown, add them manually
4. If blocks are NOT in the dropdown, there's a schema issue

### Step 7: Manual Block Addition (If Needed)
If blocks don't appear automatically:
1. Click **"Add block"** under "Product Information"
2. Add blocks in this order:
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

3. Configure each block's settings
4. Save the theme

### Step 8: Clear Theme Cache
1. Go to **Shopify Admin** → **Online Store** → **Themes**
2. Click **Actions** → **Edit code**
3. Make a small change (add a space) to `templates/product.json`
4. Save the file
5. Revert the change
6. Save again
7. This forces Shopify to reload the template

## Verification

After following these steps, you should see:
- ✅ "Product Information" section in the theme editor
- ✅ Blocks listed under "Product Information"
- ✅ Each block is clickable and configurable
- ✅ Blocks can be reordered by dragging
- ✅ Blocks can be removed and added

## Expected Block Structure

```
Template
  └── Product Information (main-product section)
      ├── Title block
      ├── Price block
      ├── Variant Picker block
      ├── Quantity Selector block
      ├── Buy Buttons block
      ├── Trust Badges block
      ├── Description block
      ├── Ingredients Tab (Collapsible Tab)
      ├── Brewing Tab (Collapsible Tab)
      └── Share Buttons block
```

## If Blocks Still Don't Appear

1. **Check browser console** for errors
2. **Verify template JSON** is valid (no syntax errors)
3. **Check section schema** is valid
4. **Try a different browser**
5. **Contact Shopify support** if issue persists

## Files to Verify

1. `templates/product.json` - Should have blocks defined
2. `sections/main-product.liquid` - Should have blocks schema
3. `config/settings_data.json` - Should have product template settings

## Notes

- Blocks are defined in both the template JSON and section schema
- Blocks should automatically appear when template is loaded
- If blocks don't show, use "Add block" to add them manually
- Blocks can be reordered by dragging in the theme editor
- Each block has its own settings that can be configured


