# Quick Start - Centralized Architecture Guide

## 🚀 Creating a New Page (3 Ways)

### Option 1: Using Layout Component (Recommended - Fastest)
```jsx
import Layout from '../components/layout/Layout';

const MyNewPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1>My Page Title</h1>
        <p>Page content goes here...</p>
      </div>
    </Layout>
  );
};

export default MyNewPage;
```
**Benefits:** Zero boilerplate, automatic Navbar/Footer, built-in theme support

---

### Option 2: Using Custom Hooks (More Control)
```jsx
import { useNavbarSetup } from '../hooks';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MyNewPage = () => {
  const { navbarProps, isDarkMode } = useNavbarSetup();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark' : 'bg-light'}`}>
      <Navbar {...navbarProps} />
      
      <main className="container mx-auto px-4 py-8">
        <h1>My Page Title</h1>
        <p>Page content goes here...</p>
      </main>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default MyNewPage;
```
**Benefits:** Full control over layout, custom styling

---

### Option 3: Manual Setup (Not Recommended)
Don't use this! Use Option 1 or 2 instead.

---

## 📚 Using Centralized Constants

### Import What You Need
```jsx
import { 
  QUICK_LINKS, 
  POPULAR_DESTINATIONS,
  CONTACT_INFO,
  COMPANY_INFO 
} from '../constants';
```

### Use in Your Components
```jsx
// Display company name
<h1>{COMPANY_INFO.name}</h1>

// Render navigation links
{QUICK_LINKS.map(link => (
  <Link key={link.path} to={link.path}>{link.name}</Link>
))}

// Show contact info
<p>Email: {CONTACT_INFO.email}</p>
<p>Phone: {CONTACT_INFO.phone}</p>

// List destinations
{POPULAR_DESTINATIONS.map(dest => (
  <Link key={dest.slug} to={`/destination/${dest.slug}`}>
    {dest.name}
  </Link>
))}
```

---

## 🎨 Available Constants

### QUICK_LINKS
```javascript
[
  { name: 'Tours', path: '/tours' },
  { name: 'Destinations', path: '/destinations' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]
```

### POPULAR_DESTINATIONS
```javascript
[
  { name: 'Hunza Valley', slug: 'hunza-valley' },
  { name: 'Skardu', slug: 'skardu' },
  { name: 'Swat Valley', slug: 'swat-valley' },
  { name: 'Fairy Meadows', slug: 'fairy-meadows' }
]
```

### CONTACT_INFO
```javascript
{
  email: 'info@paktourzone.com',
  phone: '+92 300 1234567',
  location: 'Islamabad, Pakistan'
}
```

### COMPANY_INFO
```javascript
{
  name: 'PakTourZone',
  tagline: 'Explore Pakistan\'s breathtaking beauty...',
  copyright: '© 2026 PakTourZone. All rights reserved.',
  poweredBy: {
    name: 'Zentredge',
    url: 'https://zentredge.com'
  }
}
```

### TOUR_CATEGORIES
```javascript
[
  { id: 'family', name: 'Family Packages', path: '/trip/family', ... },
  { id: 'honeymoon', name: 'Honeymoon Tours', path: '/trip/honeymoon', ... },
  // ... more categories
]
```

---

## 🔧 Custom Hooks Guide

### useNavbarSetup
Returns everything needed for Navbar component
```jsx
const { navbarProps, isDarkMode, themeDropdownRef } = useNavbarSetup();

// navbarProps contains: isDarkMode, mobileMenuOpen, setMobileMenuOpen,
// themeMode, setThemeMode, themeDropdownOpen, setThemeDropdownOpen, themeDropdownRef
```

### useClickOutside
Handle clicks outside elements (dropdowns, modals)
```jsx
const dropdownRef = useRef(null);
const [isOpen, setIsOpen] = useState(false);

useClickOutside([dropdownRef], [setIsOpen]);
```

---

## 📝 Common Patterns

### Pattern 1: Simple Page with Layout
```jsx
import Layout from '../components/layout/Layout';

const SimplePage = () => (
  <Layout>
    <section className="py-20">
      <div className="container mx-auto">
        <h1>Simple Page</h1>
        <p>Content here</p>
      </div>
    </section>
  </Layout>
);
```

### Pattern 2: Page with SEO
```jsx
import Layout from '../components/layout/Layout';
import SEO from '../components/common/SEO';

const PageWithSEO = () => (
  <>
    <SEO 
      title="My Page Title"
      description="Page description"
      keywords="relevant, keywords"
    />
    <Layout>
      <section className="py-20">
        <div className="container mx-auto">
          <h1>Page Content</h1>
        </div>
      </section>
    </Layout>
  </>
);
```

### Pattern 3: Page with Custom Navbar Handling
```jsx
import { useNavbarSetup, useClickOutside } from '../hooks';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const CustomPage = () => {
  const { navbarProps, isDarkMode, themeDropdownRef } = useNavbarSetup();
  const [customDropdown, setCustomDropdown] = useState(false);
  const customRef = useRef(null);

  useClickOutside(
    [themeDropdownRef, customRef],
    [navbarProps.setThemeDropdownOpen, setCustomDropdown]
  );

  return (
    <div>
      <Navbar {...navbarProps} />
      {/* Custom content */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};
```

---

## ✅ Do's and Don'ts

### ✅ DO
- Use Layout component for new pages
- Import constants instead of hardcoding data
- Use custom hooks for navbar setup
- Keep Footer component imported and used consistently
- Update constants file when adding new data

### ❌ DON'T
- Don't create custom footer HTML
- Don't duplicate navbar setup code
- Don't hardcode Quick Links or destinations
- Don't manually manage theme dropdown state
- Don't repeat company info or contact details

---

## 🔄 Updating Shared Data

### Adding a New Destination
Edit `src/constants/index.js`:
```javascript
export const POPULAR_DESTINATIONS = [
  { name: 'Hunza Valley', slug: 'hunza-valley' },
  { name: 'Skardu', slug: 'skardu' },
  { name: 'New Destination', slug: 'new-destination' }, // ← Add here
];
```
✅ Automatically appears in Footer on ALL pages

### Adding a New Quick Link
Edit `src/constants/index.js`:
```javascript
export const QUICK_LINKS = [
  { name: 'Tours', path: '/tours' },
  { name: 'New Page', path: '/new-page' }, // ← Add here
];
```
✅ Automatically appears in Footer on ALL pages

### Updating Contact Info
Edit `src/constants/index.js`:
```javascript
export const CONTACT_INFO = {
  email: 'newemail@paktourzone.com', // ← Update here
  phone: '+92 XXX XXXXXXX',
  location: 'New Location, Pakistan'
};
```
✅ Updates everywhere automatically

---

## 🏗️ Component Hierarchy

```
App
├── Layout (or manual setup)
│   ├── Navbar (uses navbarProps from useNavbarSetup)
│   ├── Main Content (your page content)
│   └── Footer (uses constants from src/constants)
```

---

## 📖 Full Example

```jsx
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import SEO from '../components/common/SEO';
import { COMPANY_INFO, TOUR_CATEGORIES } from '../constants';

const ExamplePage = () => {
  const [selectedTour, setSelectedTour] = useState(null);

  return (
    <>
      <SEO 
        title={`Tours - ${COMPANY_INFO.name}`}
        description={COMPANY_INFO.tagline}
      />
      
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8">
              Welcome to {COMPANY_INFO.name}
            </h1>
            
            <p className="text-lg mb-8">{COMPANY_INFO.tagline}</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {TOUR_CATEGORIES.map(tour => (
                <div 
                  key={tour.id}
                  onClick={() => setSelectedTour(tour)}
                  className="p-6 border rounded-lg cursor-pointer hover:shadow-lg"
                >
                  <h3 className="font-bold text-xl mb-2">{tour.name}</h3>
                  <p className="text-gray-600">{tour.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ExamplePage;
```

---

## 🎯 Key Takeaways

1. **Use Layout component** - Fastest way to create consistent pages
2. **Import constants** - Never hardcode shared data
3. **Use custom hooks** - Avoid repeating setup code
4. **One Footer** - Always use Footer component, never custom HTML
5. **Update once** - Change constants file, updates everywhere

---

## 📚 Documentation Index

- **CENTRALIZED_ARCHITECTURE_REPORT.md** - Full implementation details
- **HOOKS_USAGE_GUIDE.md** - Detailed hook documentation
- **CODE_OPTIMIZATION_SUMMARY.md** - Optimization history
- **QUICK_START_CENTRALIZED.md** - This file

---

*Quick Start Guide - Updated January 21, 2026*
