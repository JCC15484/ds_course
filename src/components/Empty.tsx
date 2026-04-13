import { cn } from '@/lib/utils'

// Empty component
export default function Empty() {
  return (
    <div className={cn('flex h-full items-center justify-center font-pixel text-lg border-4 border-gray-800 bg-gray-100 p-8 animate-pixel-fade-in')}>EMPTY</div>
  )
}
