import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { posts } from '@/db/schema'

export const createPostSchema = createInsertSchema(posts, {
  content: z.string().trim().min(1).max(280),
}).pick({ content: true })

export type CreatePost = z.infer<typeof createPostSchema>

export type Post = {
  id: string
  content: string
  createdAt: Date
  author: {
    id: string
    image: string
    name: string
  }
}
