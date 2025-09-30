import { Post } from '../types/post'

export function generatePostRecords(count = 100): Post[] {
  const titles = [
    'Next.js App Router Guide',
    'Building Scalable APIs',
    'Mastering TypeScript',
    'React Server Components Explained',
    'Deploying with Docker',
    'Introduction to Kubernetes',
    'GraphQL Best Practices',
    'REST API Design Patterns',
    'State Management with Redux',
    'Exploring Edge Functions',
    'Authentication in Modern Apps',
    'CI/CD Pipelines Simplified',
    'Serverless Architectures',
    'Debugging Node.js Apps',
    'Performance Optimization in React',
    'Microservices Architecture',
    'Event-Driven Systems',
    'Database Indexing Explained',
    'Caching Strategies for Web Apps',
    'Message Queues and Pub/Sub',
  ]

  const bodies = [
    'A comprehensive guide to understanding the topic in depth...',
    'Learn how to implement best practices and avoid pitfalls...',
    'Step-by-step tutorial with practical examples and code...',
    'Why this concept matters in modern development workflows...',
    'Comparing different approaches and their tradeoffs...',
    'Real-world case studies and lessons learned...',
    'Tips, tricks, and advanced techniques for professionals...',
  ]

  const records = []

  for (let i = 1; i <= count; i++) {
    const title = titles[Math.floor(Math.random() * titles.length)]
    const body = bodies[Math.floor(Math.random() * bodies.length)]
    const userId = Math.floor(Math.random() * 10) + 1 // 1–10
    const likes = Math.floor(Math.random() * 201) // 0–200
    const createdAt = new Date(
      Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000,
    ).toISOString()

    records.push({
      id: i,
      title,
      body,
      userId,
      likes,
      createdAt,
    })
  }

  return records
}
