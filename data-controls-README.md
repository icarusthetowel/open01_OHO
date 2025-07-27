# Data Controls Page Documentation

## Overview
The Data Controls page (`data-controls.html`) is a standalone page that allows users to manage their privacy preferences, data collection settings, and cache preferences. It's designed as a comprehensive privacy control center.

## Features

### 🎨 **Design & Layout**
- **Standalone Page**: No sidebar or main footer - completely independent
- **Professional Styling**: Matches the site's theme with gradient backgrounds and modern UI
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Theme Support**: Includes dark theme compatibility
- **Smooth Animations**: Scroll-triggered animations and hover effects

### 🔧 **Functionality Sections**

#### 1. **Cache Preferences**
- Enable/disable local cache
- Control search history caching
- Manage user preference storage

#### 2. **Data Collection & Analytics**
- Usage analytics opt-in/out
- Error reporting preferences
- Performance monitoring controls

#### 3. **AI Model Training & Improvement**
- Consent for AI model training
- Feature development data usage
- Research participation options

#### 4. **Privacy & Security**
- Data encryption (always enabled)
- Third-party data sharing controls
- Marketing communications preferences

#### 5. **Data Retention**
- Configurable retention periods (30 days to indefinite)
- Automatic data cleanup options

### 🛠 **Technical Implementation**

#### Files Structure:
- **`data-controls.html`** - Main page structure
- **`css/data-controls.css`** - Page-specific styling
- **`js/data-controls.js`** - Functionality and preferences management

#### Key Features:
- **LocalStorage Integration**: Preferences saved locally
- **Default Configuration**: Sensible privacy-focused defaults
- **Validation & Error Handling**: Robust preference management
- **Keyboard Shortcuts**: Ctrl+S to save, Ctrl+R to reset
- **Visual Feedback**: Success/error notifications

### 🎯 **User Experience**

#### Navigation:
- **Home Button**: Returns to main site (`index.html`)
- **Theme Toggle**: Light/dark mode switching
- **Action Buttons**: Save and Reset to Defaults

#### Accessibility:
- **ARIA Labels**: Proper accessibility markup
- **Keyboard Navigation**: Full keyboard support
- **Clear Visual Hierarchy**: Logical section organization
- **Descriptive Text**: Each option includes helpful descriptions

## Integration

### Main Site Integration:
- Linked from footer "Data Controls" in `index.html`
- Uses existing CSS architecture (`base.css`, `components.css`, etc.)
- Shares theme system with main site

### Future Enhancements:
- Server-side preference synchronization
- Advanced privacy controls
- Data export/import functionality
- Integration with main site user accounts

## Usage Instructions

### For Users:
1. Click "Data Controls" in the main site footer
2. Review and adjust preferences in each section
3. Click "Save Preferences" to store changes
4. Use "Reset to Defaults" to restore original settings
5. Use "Home" button to return to main site

### For Developers:
- Preferences are stored in `localStorage` with key `oho_data_preferences`
- Default values defined in `DEFAULT_PREFERENCES` object
- Extend functionality by adding new sections to the HTML and corresponding JS logic
