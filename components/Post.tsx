import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/utils/cn'

export type PostProps = {
  className?: string
  authorName: string
  authorImage?: string
  content: string
}

export function Post({
  className,
  authorName,
  authorImage,
  content,
}: PostProps) {
  return (
    <div className={cn('flex p-4 items-start space-x-3', className)}>
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
