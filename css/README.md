# CSS Architecture Documentation

## Overview
The stylesheet has been modularized into separate, focused CSS files for better maintainability, scalability, and professional development practices.

## File Structure
```
css/
├── main.css          # Main import file (optional)
├── base.css          # Global styles, resets, layout
├── sidebar.css       # Navigation sidebar styles
├── components.css    # Reusable UI components
├── forms.css         # All form styling
├── pages.css         # Page-specific layouts
├── footer.css        # Footer styling
└── dark-theme.css    # Dark mode overrides
```

## Module Descriptions

### base.css
- Global HTML/body styles
- Container layouts
- Typography foundations
- Basic page structure

### sidebar.css
- Sidebar navigation styling
- Mobile responsive behavior
- Collapse functionality
- Menu items and company branding

### components.css
- Reusable UI elements
- Authentication buttons
- Theme toggle components
- AI response containers
- Notes and meal plan items

### forms.css
- All form styling (contact, search, etc.)
- Input field styling
- Button variations
- Form validation states
- Responsive form behavior

### pages.css
- Page-specific layouts
- News sections
- About page team grid
- Article grid layouts
- Section-specific styling

### footer.css
- Footer layout and styling
- Social media icons
- Footer links
- Copyright information

### dark-theme.css
- Dark mode color overrides
- Theme-specific component styling
- Maintains visual consistency in dark mode

## Benefits

### Maintainability
- Easy to locate and modify specific styles
- Reduced file size per module
- Clear separation of concerns

### Scalability
- Easy to add new modules
- Can load only necessary styles
- Better performance optimization

### Team Collaboration
- Multiple developers can work on different modules
- Cleaner git diffs
- Reduced merge conflicts

### Performance
- Can implement lazy loading
- Better caching strategies
- Smaller initial bundle sizes

## Usage

The HTML file loads each CSS module individually:

```html
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/sidebar.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/forms.css">
<link rel="stylesheet" href="css/pages.css">
<link rel="stylesheet" href="css/footer.css">
<link rel="stylesheet" href="css/dark-theme.css">
```

Alternatively, you can use the main.css file that imports all modules:

```html
<link rel="stylesheet" href="css/main.css">
```

## Best Practices

1. **Load Order**: CSS files are loaded in dependency order
2. **Naming**: Use BEM or consistent naming conventions
3. **Comments**: Document complex styles and browser-specific fixes
4. **Media Queries**: Keep responsive styles within relevant modules
5. **Variables**: Consider CSS custom properties for consistency

## Migration Notes

- Original `style.css` backed up as `style-backup.css`
- All existing functionality preserved
- No visual changes to the website
- All responsive behavior maintained
- Dark theme functionality intact
