# Phoenix Vibe - Phoenix + React + shadcn/ui

🔥 A modern web application built with **Phoenix Framework 1.7.21**, **React 18**, and **shadcn/ui** components with TypeScript support.

## 🚀 Features

- **Phoenix Framework 1.7.21** - Latest Elixir web framework
- **React 18** - Modern React with hooks and concurrent features
- **shadcn/ui** - Beautiful, accessible components built on Radix UI
- **TypeScript** - Full type safety for frontend code
- **Tailwind CSS** - Utility-first CSS framework with shadcn/ui design system
- **Phoenix LiveView** - Real-time features with server-rendered HTML
- **ESBuild** - Fast JavaScript bundler
- **PostgreSQL** - Production-ready database

## 🛠️ Tech Stack

### Backend
- **Elixir 1.17.3** with **OTP 27**
- **Phoenix Framework 1.7.21**
- **Phoenix LiveView 1.0.17**
- **Ecto** for database interactions
- **PostgreSQL** database

### Frontend
- **React 18.2** with **TypeScript 5.0**
- **shadcn/ui** - Modern component library
- **Radix UI** - Accessible primitives
- **Tailwind CSS** - Utility-first styling
- **ESBuild** for bundling
- **class-variance-authority** - Component variants
- **clsx** + **tailwind-merge** - Conditional styling

## 📋 Prerequisites

- **Elixir 1.17+** and **Erlang/OTP 27+**
- **Node.js 18+** and **npm**
- **PostgreSQL 12+**
- **Phoenix Framework** (installed via `mix archive.install hex phx_new`)

## 🚀 Getting Started

### 1. Clone and Setup

```bash
# The project is already initialized in the current directory
cd phoenix_vibe_coding

# Install Elixir dependencies
mix deps.get

# Create and migrate database
mix ecto.create
mix ecto.migrate

# Install Node.js dependencies
cd assets
npm install
cd ..
```

### 2. Build Frontend Assets

```bash
# Build React app (run from assets directory)
cd assets
npm run build
cd ..

# Or for development with file watching
cd assets
npm run dev
cd ..
```

### 3. Start the Server

```bash
# Start Phoenix server
mix phx.server

# Or start with Interactive Elixir shell
iex -S mix phx.server
```

Visit **http://localhost:4000** to see your React app with shadcn/ui components!

## 📁 Project Structure

```
phoenix_vibe_coding/
├── assets/                 # Frontend assets
│   ├── js/
│   │   ├── app.js         # Main JavaScript entry point
│   │   ├── components/
│   │   │   ├── App.tsx    # React app component
│   │   │   └── ui/        # shadcn/ui components
│   │   │       ├── button.tsx
│   │   │       └── card.tsx
│   │   └── lib/
│   │       └── utils.ts   # Utility functions
│   ├── css/
│   │   └── app.css        # Tailwind + shadcn/ui styles
│   ├── package.json       # Node.js dependencies
│   └── tsconfig.json      # TypeScript configuration
├── lib/
│   ├── phoenix_vibe/      # Application business logic
│   └── phoenix_vibe_web/  # Web interface
├── components.json        # shadcn/ui configuration
├── tsconfig.json          # Root TypeScript config
└── mix.exs                # Elixir project configuration
```

## 🎨 shadcn/ui Integration

### Components Available
- ✅ **Button** - Multiple variants (default, destructive, outline, secondary, ghost, link)
- ✅ **Card** - Header, content, footer sections
- 🔄 **More components** - Easily add more shadcn/ui components

### Adding New Components

Since we're using a custom Phoenix setup, components are added manually:

1. **Create the component** in `assets/js/components/ui/`
2. **Import and use** in your React components
3. **Build** with `npm run build`

Example usage:
```tsx
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Click me</Button>
      </CardContent>
    </Card>
  )
}
```

### Styling System

- **CSS Variables** - Dark/light theme support
- **Tailwind Classes** - All shadcn/ui components use Tailwind
- **Component Variants** - Powered by `class-variance-authority`
- **Utility Function** - `cn()` helper for conditional classes

## 🔧 Available Scripts

### Frontend (from `assets/` directory)
- `npm run build` - Build production assets
- `npm run dev` - Build with file watching for development
- `npm run deploy` - Build minified production assets

### Backend (from project root)
- `mix phx.server` - Start development server
- `mix test` - Run tests
- `mix ecto.migrate` - Run database migrations
- `mix deps.get` - Install dependencies

## 🎨 React Integration

The React app is integrated into Phoenix through:

1. **React Components**: Located in `assets/js/components/`
2. **shadcn/ui Components**: Located in `assets/js/components/ui/`
3. **Mount Point**: The React app mounts to `<div id="react-app"></div>` in the Phoenix template
4. **Build Process**: ESBuild compiles React/TypeScript code into Phoenix's asset pipeline
5. **LiveView Compatibility**: React and Phoenix LiveView can coexist

### Key Files:
- `assets/js/app.js` - Main JavaScript entry point with Phoenix and React setup
- `assets/js/components/App.tsx` - Main React application component
- `assets/js/components/ui/` - shadcn/ui component library
- `assets/js/lib/utils.ts` - Utility functions including `cn()` helper
- `components.json` - shadcn/ui configuration
- `assets/css/app.css` - Tailwind CSS with shadcn/ui variables

## 🌟 Features Demo

The example React app includes:
- **Interactive Counter** - React state management
- **shadcn/ui Components** - Button variants, Cards, Typography
- **Modern Design System** - Consistent styling with CSS variables
- **Dark Mode Ready** - CSS variables support theme switching
- **TypeScript Integration** - Full type safety
- **Responsive Design** - Mobile-first approach

## 🔄 Development Workflow

1. **Backend Changes**: Edit files in `lib/` - Phoenix auto-reloads
2. **Frontend Changes**: Edit files in `assets/js/` - run `npm run dev` for auto-rebuilding
3. **New UI Components**: Add to `assets/js/components/ui/`
4. **Database Changes**: Create migrations with `mix ecto.gen.migration`
5. **Styling**: Use Tailwind classes and shadcn/ui design tokens

## 🚀 Deployment

For production deployment:

1. **Build Assets**: `cd assets && npm run deploy`
2. **Compile Phoenix**: `MIX_ENV=prod mix compile`
3. **Database**: `MIX_ENV=prod mix ecto.migrate`
4. **Start**: `MIX_ENV=prod mix phx.server`

## 🎨 Customization

### Theme Customization
Edit `assets/css/app.css` to customize the shadcn/ui theme:

```css
:root {
  --primary: 220 14.3% 95.9%;
  --primary-foreground: 220.9 39.3% 11%;
  /* ... other variables */
}
```

### Adding More shadcn/ui Components
1. Visit [ui.shadcn.com](https://ui.shadcn.com/docs/components)
2. Copy the component code
3. Create new file in `assets/js/components/ui/`
4. Import and use in your React components

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Resources

- [Phoenix Framework Documentation](https://hexdocs.pm/phoenix/overview.html)
- [React Documentation](https://react.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Elixir Documentation](https://elixir-lang.org/docs.html)
- [Phoenix LiveView](https://hexdocs.pm/phoenix_live_view/Phoenix.LiveView.html)

---

**Built with ❤️ using Phoenix Framework, React, and shadcn/ui**
