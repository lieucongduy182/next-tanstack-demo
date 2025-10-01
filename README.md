# 🚀 TanStack Query Tutorial

A comprehensive, interactive tutorial for learning TanStack Query (React Query) from fundamentals to advanced concepts. Built with Next.js 15, TypeScript, and Tailwind CSS. Deploy project to Google Cloud & Trigger automatically the deployment.

## 📚 What You'll Learn

This tutorial covers everything you need to master TanStack Query:

- **Fundamentals** - useQuery, useMutation, cache management
- **Advanced Concepts** - Parallel queries, dependent queries, pagination
- **Optimistic Updates** - Instant UI updates with automatic rollback
- **Infinite Queries** - Infinite scrolling with useInfiniteQuery

## ✨ Features

- 🎯 **Interactive Examples** - Live demos with real mock API calls
- 💻 **Complete Code Samples** - Copy-paste ready code for each concept
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS
- 🌙 **Dark Mode** - Full dark mode support
- 📱 **Responsive** - Works on all devices
- 🔍 **React Query DevTools** - Built-in debugging tools
- ⚡ **TypeScript** - Fully typed for better developer experience

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ installed
- npm or pnpm package manager
-  

### Installation

```bash
# Install pnpm package manager
npm i -g pnpm@latest

# Clone the repository
git clone https://github.com/lieucongduy182/next-tanstack-tutorial.git
cd next-tanstack-tutorial

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the tutorial.

## 📖 Tutorial Structure

```
/                          - Home page with tutorial overview
/fundamentals              - Basic useQuery and useMutation
/advanced                  - Parallel queries, dependent queries, pagination
/optimistic-updates        - Optimistic UI patterns
/infinite-query            - Infinite scrolling implementation
```

## 🗂️ Project Structure

```
next-tanstack-tutorial/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── fundamentals/         # Fundamentals tutorial
│   │   ├── advanced/             # Advanced concepts
│   │   ├── optimistic-updates/   # Optimistic updates demo
│   │   └── infinite-query/       # Infinite query demo
│   │
│   ├── components/
│   │   └── providers/            # QueryClientProvider setup
│   │
│   ├── lib/
│   │   ├── api/                  # Mock API functions
│   │   │   ├── posts.ts
│   │   │   ├── users.ts
│   │   │   └── todos.ts
│   │   └── queryClient.ts        # QueryClient configuration
│   │
│   └── types/                    # TypeScript types
│       ├── post.ts
│       ├── user.ts
│       └── todo.ts
│
├── public/                       # Static assets
├── Dockerfile                    # Docker configuration
├── docker-compose.yml            # Docker Compose setup
├── cloudbuild.yaml              # Google Cloud Build config
└── package.json                  # Dependencies
```

## 🛠️ Technologies Used

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TanStack Query v5](https://tanstack.com/query)** - Data synchronization library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[React Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)** - Debugging tools
- **[Google Cloud Console](https://console.cloud.google.com/query/latest/docs/react/devtools)** - Google Cloud for Services, Build, APIs & Services

## 📦 Available Scripts

```bash
# Development
pnpm dev          # Start development server

# Production
pnpm run build        # Build for production
pnpm start            # Start production server

# Docker
docker build -t next-tanstack-tutorial .
docker run -p 8080:8080 next-tanstack-tutorial

# Docker Compose
docker-compose up    # Start with Docker Compose
```

### Deploy to Google Cloud Run

```bash
# Set your project ID
export PROJECT_ID=your-project-id

# Build and push image
docker build -t gcr.io/$PROJECT_ID/next-tanstack-tutorial:latest .
docker push gcr.io/$PROJECT_ID/next-tanstack-tutorial:latest

# Deploy to Cloud Run
gcloud run deploy next-tanstack-tutorial \
  --image gcr.io/$PROJECT_ID/next-tanstack-tutorial:latest \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated
```

## 🔄 CI/CD with Cloud Build

Automatic deployment on every push to `main` branch:

1. **Enable Cloud Build API** in Google Cloud Console
2. **Connect your GitHub repository** to Cloud Build
3. **Push to main branch** - automatic deployment triggers

The `cloudbuild.yaml` file is already configured for automatic deployments.

## 💡 Key Concepts

### Query Keys
```typescript
// Simple key
queryKey: ['posts']

// With parameters
queryKey: ['posts', { page: 1 }]

// Nested
queryKey: ['user', userId, 'posts']
```

### Query Options
```typescript
{
  staleTime: 1000 * 60 * 5,    // 5 minutes
  gcTime: 1000 * 60 * 10,       // 10 minutes
  retry: 1,
}
```

### Mutations
```typescript
const mutation = useMutation({
  mutationFn: createPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
});
```

## 🙏 Acknowledgments

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Cloud](https://cloud.google.com/docs)

---

**Built with ❤️ using TanStack Query, Next.js, and TypeScript**