import { Skeleton } from "#/components/ui/skeleton"

const SliderSkeleton = () => {
    return (
        <>
            {Array.from({ length: 8 }).map((_, i) => (
                <div className="space-y-4" key={i}>
                    <Skeleton className="aspect-4/5 w-full rounded-none" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                    <Skeleton className="h-6 w-24" />
                </div>
            ))}
        </>
    )
}

export default SliderSkeleton