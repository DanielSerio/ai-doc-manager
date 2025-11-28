# AI Doc Manager - Frontend

This is the frontend for the AI Doc Manager application. It is a React application that uses @tanstack/react-router for routing. Will use trpc for API calls.

## Structure

```
├── src
│   ├── components             # Components. Should be organized into features/modules.
│   |   ├── layout             # Layout components
│   |   |   ├── Header.tsx
│   |   |   ├── Sidebar.tsx
│   |   |   ├── Main.tsx
│   |   |   └── Layout.tsx
│   |   ├── ui                 # UI components from shadcn/ui
│   |   |   ├── button.tsx
│   |   |   ├── input.tsx
│   |   |   └── ...
│   ├── hooks                  # custom hooks. Should be organized into features/modules.
|   |   ├── layout             # layout hooks
|   |   |   └── use-mobile.ts  # shadcn/ui hooks do not follow our naming convention
|   |   ├── rule-documents     # rule document hooks
|   |   ├── general-documents  # general document hooks
|   |   └── rules              # rule hooks
│   ├── routes                 # routes. @tanstack/react-router file-based routing
│   ├── lib                    # main application logic/utilities
|   |   ├── utils              # utility functions
|   |   ├── api                # API services
|   |   └── schemas            # Zod schemas
│   ├── types                  # types. Should be organized into features/modules.
│   ├── index.css              # global styles
│   └── main.tsx               # main application entry point
├── vite.config.ts             # Vite configuration
└── README.md                  # this file
```

