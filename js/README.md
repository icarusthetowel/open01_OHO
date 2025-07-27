# JavaScript Module Architecture

This project now uses a modular JavaScript architecture for better maintainability and scaling. All JavaScript functionality has been separated into logical modules within the `js/` directory.

## Module Structure

### Core Modules

- **`js/main.js`** - Main application coordinator that initializes all modules
- **`js/storage.js`** - Local storage utilities for data persistence
- **`js/api.js`** - API handling and AI communication functionality

### UI Modules

- **`js/navigation.js`** - Navigation and section management
- **`js/sidebar.js`** - Sidebar functionality and mobile responsiveness  
- **`js/theme.js`** - Theme management (light/dark mode)

### Feature Modules

- **`js/forms.js`** - Form handling (home search, contact, recipes, auth)
- **`js/tasks.js`** - Task management functionality
- **`js/notes.js`** - Notes management functionality
- **`js/account.js`** - Account management functionality

## Loading Order

The modules are loaded in a specific order in `index.html` to ensure dependencies are available:

1. `storage.js` - Core storage utilities (no dependencies)
2. `api.js` - API functionality (no dependencies)
3. `sidebar.js` - Sidebar functionality (no dependencies)
4. `navigation.js` - Navigation (depends on sidebar functions)
5. `forms.js` - Form handling (depends on api.js)
6. `tasks.js` - Task management (depends on storage.js)
7. `notes.js` - Notes management (depends on storage.js)
8. `account.js` - Account management (depends on storage.js)
9. `theme.js` - Theme management (self-contained)
10. `main.js` - Application coordinator (depends on all modules)

## Benefits

- **Maintainability**: Each module handles a specific area of functionality
- **Scalability**: New features can be added as separate modules
- **Debugging**: Issues can be isolated to specific modules
- **Reusability**: Modules can be easily reused or replaced
- **Team Development**: Multiple developers can work on different modules simultaneously

## Global Functions

Key functions are exported to the global scope for cross-module communication:

- Navigation: `showSection()`, `setActive()`, `scrollToTop()`
- Sidebar: `updateAbbrev()`, `checkWidth()`
- Storage: `StorageManager` object with all storage methods
- API: `askAI()`, `getApiKey()`
- Feature displays: `displayTasks()`, `displayNotes()`, `loadAccount()`

## File Backup

The original `main.js` has been backed up as `main.js.backup` for reference.
