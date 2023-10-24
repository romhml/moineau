import { Avatar, AvatarImage } from '@/components/ui/avatar'

export type PostProps = {
  authorName: string
  authorImage?: string
  content: string
}

export function Post({ authorName, authorImage, content }: PostProps) {
  return (
    <div className="flex border-slate-200 p-4 border-t items-start space-x-3">
      <Avatar>
        <AvatarImage src={authorImage} />
      </Avatar>
      <div className="mt-2">
        <p className="font-bold">{authorName}</p>
        <p>{content}</p>
      </div>
    </div>
  )
}
