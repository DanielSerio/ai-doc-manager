# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Document and Rule Management Application - Full-stack TypeScript application for managing documents, rules, and rule-document associations.

**Stack:**
- Backend: tRPC + LibSQL (SQLite) + Drizzle ORM
- Frontend: React 19 + TanStack Router + TanStack Query + shadcn/ui

## Development Commands

### Backend
```bash
cd backend
tsx src/index.ts           # Run backend server (port 2022)
npx drizzle-kit generate   # Generate migrations from schema
npx drizzle-kit migrate    # Apply migrations
npx drizzle-kit studio     # Open database GUI
```

### Frontend
```bash
cd web
npm run dev         # Start Vite dev server
npm run build       # Build for production (runs tsc + vite build)
npm run lint        # Run ESLint
npm run preview     # Preview production build
```

## Architecture

### Project Structure

```
ai-doc-manager/
├── docs/                          # Project documentation
│   ├── core/                      # Core/global documentation
│   │   ├── DOCUMENTATION-WORKFLOW.md
│   │   ├── PROJECT-STUCTURE.md
│   │   └── DEVELOPMENT-PRINCIPLES.md
│   ├── archive/                   # Archived feature documentation (SUMMARY-[N].md)
│   ├── specs/                     # Gherkin specs for features ([FEATURE_NAME].feature)
│   ├── tasks/                     # Task lists for features ([FEATURE_NAME].md)
│   └── implementations/           # Implementation details ([FEATURE_NAME].md)
├── backend/
│   ├── src/
│   │   ├── db/schema.ts           # Drizzle ORM schema (single source of truth)
│   │   ├── router/
│   │   │   ├── init.ts            # tRPC initialization
│   │   │   ├── index.ts           # Main router (appRouter export)
│   │   │   ├── rules.ts           # Rules CRUD endpoints
│   │   │   ├── general-documents.ts
│   │   │   └── rule-documents.ts
│   │   └── index.ts               # Server entry point
│   └── drizzle.config.ts
└── web/
    ├── src/
    │   ├── components/
    │   │   ├── ui/                # shadcn/ui components (kebab-case, DO NOT EDIT)
    │   │   └── [feature]/         # Feature components (PascalCase)
    │   ├── hooks/
    │   │   ├── [feature]/         # Feature hooks (camelCase)
    │   │   ├── rules/
    │   │   ├── general-documents/
    │   │   └── rule-documents/
    │   ├── lib/
    │   │   ├── api/trpc.ts        # tRPC client setup
    │   │   ├── schemas/           # Zod validation schemas (client-side)
    │   │   └── utils/             # Utility functions
    │   │       ├── cn.ts          # clsx + tailwind-merge utility
    │   │       └── [feature]/     # Feature utilities
    │   ├── routes/                # TanStack Router file-based routes
    │   ├── types/trpc.ts          # AppRouter type import
    │   └── main.tsx
    └── routeTree.gen.ts           # Auto-generated (DO NOT EDIT)
```

### Domain Model

**Three main entities:**

1. **Rules** - Reusable rules with priority (0-100)
   - `rawContent` (text, max 512 chars)
   - `priority` (integer, default 50)

2. **General Documents** - Standalone documents
   - `path` (URL path format: `/^\/[/.a-zA-Z0-9-]+$/`)
   - `name` (max 64 chars), `description` (max 512 chars)
   - `rawContent` (full document text)

3. **Rule Documents** - Documents with associated rules
   - Many-to-many relationship with Rules via junction table
   - Junction has: `isEnabled`, `priorityOverride`

### Backend Patterns

**tRPC Router Structure:**
- All procedures are public (no auth layer currently)
- Consistent pagination: `limit` (default 10), `offset` (default 0)
- Sorting: `sorting: Record<'asc' | 'desc', string[]>` (direction → column names)
- Mutations return updated records
- Rule Documents use transactions for atomic updates

**Database (Drizzle ORM):**
- Schema in `backend/src/db/schema.ts` is the single source of truth
- Use `drizzle-zod` to auto-generate Zod schemas: `createInsertSchema()`, `createSelectSchema()`, `createUpdateSchema()`
- LibSQL client (turso-compatible SQLite)
- All tables have `createdAt`, `updatedAt` timestamps

**When adding new endpoints:**
1. Define Drizzle table in `schema.ts`
2. Generate Zod schemas with drizzle-zod
3. Create router file in `backend/src/router/`
4. Add to appRouter in `backend/src/router/index.ts`
5. Types automatically flow to frontend

### Frontend Patterns

**State Management:**
- Server state: TanStack Query + tRPC
- Local state: React Hook Form + Zod validation
- No global state library (React Query handles server caching)

**Custom Hooks Pattern:**
All data hooks return `[state, methods] as const`:

```typescript
const [state, methods] = useRules();
// state: { query, paging: { limit, offset, total } }
// methods: { goToFirstPage, goToLastPage, goToPreviousPage, goToNextPage, changeColumnSorting }
```

Data table columns should be defined in `use[Feature]Columns` hooks.

**Mutations:**
- Pattern: `useCreateXMutation()`, `useUpdateXMutation(id)`, `useDeleteXMutation(id)`
- Use React Query's `useMutation()` under the hood
- Invalidate queries on success for automatic refetching

**Forms:**
- React Hook Form with Zod resolver
- Schemas in `web/src/lib/schemas/`
- Use `@hookform/resolvers` for integration

**Components:**
- shadcn/ui components in `web/src/components/ui/` (managed by shadcn CLI, use kebab-case)
- To add new shadcn components: `npx shadcn@latest add [component-name]`
- Custom components use modular structure: `web/src/components/[feature]/[Feature].tsx` (PascalCase)
- When building custom components, use primitive shadcn components as building blocks
- Try not to modify generated shadcn components
- Use `cn()` utility from `lib/utils/cn.ts` for className merging
- Always use `testid` selectors for testing

**Routing (TanStack Router):**
- File-based routing in `src/routes/`
- `routeTree.gen.ts` is auto-generated by Vite plugin
- Route files export: `createFileRoute()` function
- Type-safe navigation and search params

### Type Safety

**End-to-end type safety flow:**
1. Backend exports `AppRouter` type from `src/router/index.ts`
2. Frontend imports as `type ApiRouter` in `src/types/trpc.ts`
3. tRPC client (`useTRPCClient()`) provides fully typed API calls
4. No manual type definitions needed for API contracts

### Configuration

**Environment Variables:**

Backend (`.env.local`):
```
TRPC_PORT=2022
DB_FILE_NAME=dev_ai_doc_manager.db
```

Frontend (`.env.local`):
```
VITE_API_BASE_URL=http://localhost:2022/api
```

## Common Development Tasks

### Adding a New Domain Model

1. Define Drizzle table in `backend/src/db/schema.ts`
2. Generate Zod schemas using drizzle-zod
3. Create router in `backend/src/router/[model].ts` with CRUD procedures
4. Add router to `appRouter` in `backend/src/router/index.ts`
5. Run `npx drizzle-kit generate` and `npx drizzle-kit migrate`
6. Create frontend hooks in `web/src/hooks/[model]/`
7. Create Zod validation schemas in `web/src/lib/schemas/[model].ts`
8. Create routes in `web/src/routes/` as needed
9. Build UI with shadcn/ui components

### Adding shadcn/ui Components

```bash
cd web
npx shadcn@latest add [component-name]
```

This installs the component in `src/components/ui/`. Do not manually edit these files.

### Database Migrations

After modifying `backend/src/db/schema.ts`:
```bash
cd backend
npx drizzle-kit generate   # Creates migration SQL
npx drizzle-kit migrate    # Applies migration
```

### Testing

- Do NOT write unit tests (waste of effort per project policy)
- Integration and e2e tests should use Playwright
- Keep test cases simple and focused
- AVOID mocking in tests
- ALWAYS use `testid` selectors for DOM queries
- Example: `<button data-testid="submit-button">Submit</button>`

## Development Principles

### Code Style
1. ALWAYS prefer simple solutions over complex or clever solutions
2. ALWAYS use SOLID principles
3. DO YOUR BEST to use DRY principles
4. DO YOUR BEST to use YAGNI principle
5. Use modular project structure with barrel files for exports

### TypeScript
1. ALL `.ts` and `.tsx` files should be under 201 lines (excluding constants, mock data, `use[Feature]Columns` hooks, and test files)
2. NEVER use `any` type
3. PREFER inference over explicit typing

### React
1. Ensure components and hooks are pure and idempotent
2. Treat props and state as immutable; avoid direct modification
3. Prefer functional components and React Hooks over class components
4. Utilize custom hooks to encapsulate and reuse stateful logic
5. Employ Context API for global state where prop drilling becomes cumbersome

### File Naming Conventions
- shadcn/ui components in `src/components/ui/`: kebab-case
- Custom hook files: camelCase (e.g., `useRules.tsx`)
- Custom component files: PascalCase (e.g., `RulesList.tsx`)
- Utility functions: camelCase (e.g., `formatDate.ts`)

## Documentation Workflow

This project uses a structured documentation workflow for feature development. See `docs/core/DOCUMENTATION-WORKFLOW.md` for full details.

### When User Requests "Generate Documentation for [Feature]"

1. Generate Gherkin spec: `docs/specs/[FEATURE_NAME].feature` (prefer simplicity, no implementation details)
2. Generate task file: `docs/tasks/[FEATURE_NAME].md` (simple task breakdown)
3. Generate implementation file: `docs/implementations/[FEATURE_NAME].md` (implementation approach)

### When User Requests "Develop [Feature]"

1. Read the spec, task, and implementation files for the feature
2. Begin development based on these files
3. Update the task file as phases are completed (ensures progress tracking through session handoff)

### When User Requests "Archive Documentation"

1. Review `docs/tasks/` to identify completed features
2. Create 1-paragraph max summary for each completed feature
3. Append summaries to current summary document in `docs/archive/SUMMARY-[N].md`
4. When a summary document reaches ~500 lines, create new `SUMMARY-[N+1].md`
5. Delete completed feature files from `docs/tasks/`, `docs/implementations/`, and `docs/specs/`

## Key Design Decisions

1. **tRPC for API:** Eliminates need for OpenAPI specs, provides end-to-end type safety
2. **Drizzle ORM:** Schema-first with Zod generation, better TypeScript support than Prisma
3. **TanStack Router:** File-based routing with automatic code splitting and type safety
4. **React Query:** Handles server state caching, synchronization, and background updates
5. **shadcn/ui:** Copy-paste component library (not npm package), full customization control
6. **Pagination-first:** All list endpoints support pagination for scalability
7. **LibSQL:** Modern SQLite client with better async support
