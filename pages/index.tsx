import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Post } from '@/components/Post'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { createPostSchema, CreatePost } from '@/server/schemas'
import { trpc } from '@/utils/trpc'
import Layout from './layout'

export default function Home() {
  const form = useForm<CreatePost>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: '',
    },
  })

  const { data: posts } = trpc.posts.list.useQuery({})
  const mutation = trpc.posts.create.useMutation({
    onSuccess: (data) => {
      form.reset()
      posts?.unshift(data)
    },
  })

  function submit(data: CreatePost) {
    mutation.mutate(data)
  }

  return (
    <Layout>
      <div className="max-w-lg w-full mx-auto border-b border-x border-slate-200 rounded-b">
        <section>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submit)}
              className="p-4"
            >
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <textarea
                      className="resize-none text-md w-full focus:outline-none"
                      placeholder="What's on your mind today?"
                      rows={5}
                      {...field}
                    />
                    <div className="flex justify-between">
                      <FormMessage />
                      <FormDescription />
                      <Button
                        type="submit"
                        variant="ghost"
                      >
                        Submit
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </section>
        <section>
          {posts?.map((post) => (
            <Post
              key={post.id}
              authorName={post.author.name || 'N/A'}
              authorImage={post.author.image || undefined}
              content={post.content}
            />
          ))}
        </section>
      </div>
    </Layout>
  )
}
