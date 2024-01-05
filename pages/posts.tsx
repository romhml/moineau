import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useMemo, useRef, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Post } from '@/components/Post'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  createPostSchema,
  CreatePost,
  Post as PostSchema,
} from '@/server/schemas'
import { trpc } from '@/utils/trpc'
import Layout from './layout'

export default function Home() {
  const { data: user } = useSession()
  const form = useForm<CreatePost>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: '',
    },
  })

  const postQuery = trpc.posts.list.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // initialCursor: 1, // <-- optional you can pass an initialCursor
    },
  )

  // useMemo allows to re-compute the posts only when postQuery.data changes
  const posted = useRef<PostSchema[]>([])

  const posts = useMemo(
    () => postQuery.data?.pages?.flatMap((page) => page.items),
    [postQuery.data],
  )

  const observerEl = useRef(null)

  // Something is wrong here, every thing is fetched on initial load
  useEffect(() => {
    const element = observerEl.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || postQuery.isFetching) return
        postQuery.fetchNextPage()
      },
      { threshold: 0 },
    )

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [postQuery])

  const mutation = trpc.posts.create.useMutation({
    onSuccess: (data) => {
      form.reset()
      posted.current.unshift(data)
    },
  })

  function submit(data: CreatePost) {
    mutation.mutate(data)
  }

  return (
    <Layout>
      <div className="max-w-lg w-full mx-auto border-b border-x border-gray-200 dark:border-gray-800 rounded-b-lg">
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
                    <div className="flex space-x-4">
                      <Avatar>
                        <AvatarImage src={user?.user?.image || undefined} />
                        <AvatarFallback></AvatarFallback>
                      </Avatar>
                      <textarea
                        className="resize-none text-lg w-full focus:outline-none bg-transparent mt-2 cursor-text"
                        placeholder="What's on your mind today?"
                        rows={5}
                        {...field}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            form.handleSubmit(submit)()
                          }
                        }}
                      />
                    </div>
                    <div className="flex justify-between">
                      <FormMessage className="dark:text-red-400" />
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
          {posted.current?.map((post) => (
            <Post
              className="border-t border-gray-200 dark:border-gray-800"
              key={post.id}
              authorName={post.author.name || 'N/A'}
              authorImage={post.author.image || undefined}
              content={post.content}
            />
          ))}
          {posts?.map((post) => (
            <Post
              className="border-t border-gray-200 dark:border-gray-800"
              key={post.id}
              authorName={post.author.name || 'N/A'}
              authorImage={post.author.image || undefined}
              content={post.content}
            />
          ))}
        </section>
      </div>
      <div className="flex flex-col items-center justify-center h-10">
        {postQuery.hasNextPage && <div ref={observerEl} />}
        {postQuery.isFetching && <Loader2 className="animate-spin" />}
      </div>
    </Layout>
  )
}
