# Components Structure

This folder contains all the refactored components for the Earth Footprint website. Each component has its own CSS module to prevent style conflicts.

## Component List

1. **Navigation.jsx** - Top navigation bar with mobile menu

   - CSS Module: `Navigation.module.css`
   - Features: Responsive menu, smooth scrolling

2. **Hero.jsx** - Hero section with animated background and stats cards

   - CSS Module: `Hero.module.css`
   - Features: Animated gradient background, floating stats cards, CTA button

3. **Services.jsx** - Services section displaying environmental consulting services

   - CSS Module: `Services.module.css`
   - Features: Grid layout, animated cards, service features list

4. **Projects.jsx** - "Why Choose Us" section with company highlights

   - CSS Module: `Projects.module.css`
   - Features: Glass-morphism cards, animated reveals

5. **Clients.jsx** - Client logos carousel

   - CSS Module: `Clients.module.css`
   - Features: Infinite scroll carousel, responsive layout

6. **About.jsx** - About section with company information

   - CSS Module: `About.module.css`
   - Features: Floating logo elements, value propositions

7. **Contact.jsx** - Contact section with map and WhatsApp buttons

   - CSS Module: `Contact.module.css`
   - Features: Google Maps embed, WhatsApp CTAs, responsive layout

8. **Footer.jsx** - Footer with links and copyright
   - CSS Module: `Footer.module.css`
   - Features: Responsive layout, navigation links

## CSS Modules Benefits

- **Scoped Styles**: Each component's styles are scoped to prevent conflicts
- **Better Organization**: Easier to find and maintain styles for specific components
- **Improved Performance**: Only load styles needed for each component
- **Easy Maintenance**: Change one component without affecting others

## Shared Styles

Global CSS variables and common styles are in `src/styles/shared.css`

## Usage

Import components in your main App.jsx:

```javascript
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
// ... other imports

function App() {
  return (
    <div className="app">
      <Navigation />
      <Hero />
      {/* ... other components */}
    </div>
  );
}
```

## Development Notes

- All components use React hooks (useState, useCallback, useMemo) for optimization
- Animations powered by Framer Motion
- Icons from lucide-react
- Fully responsive design with mobile-first approach
- RTL (Right-to-Left) support for Arabic content
