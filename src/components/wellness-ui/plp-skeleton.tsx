export function PlpSkeleton() {
    return (
        <div className="container-standard py-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="mb-8">
                <div className="h-10 w-48 bg-stone-200 rounded-md mb-2"></div>
                <div className="h-4 w-32 bg-stone-100 rounded-md"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Skeleton */}
                <div className="hidden md:flex flex-col w-[260px] flex-shrink-0 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="py-4 border-b border-stone-200">
                            <div className="h-6 w-32 bg-stone-200 rounded-md mb-4"></div>
                            <div className="flex flex-col gap-3">
                                {[1, 2, 3].map((j) => (
                                    <div key={j} className="flex items-center gap-3">
                                        <div className="h-5 w-5 bg-stone-200 rounded"></div>
                                        <div className="h-4 w-24 bg-stone-100 rounded"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Skeleton */}
                <div className="flex-1">
                    {/* Toolbar Skeleton */}
                    <div className="flex flex-col mb-8 gap-4">
                        <div className="flex justify-between items-center">
                            <div className="h-6 w-24 bg-stone-200 rounded-md"></div>
                            <div className="flex gap-3">
                                <div className="h-11 w-[200px] bg-stone-200 rounded-full"></div>
                                <div className="h-11 w-[160px] bg-stone-200 rounded-xl"></div>
                            </div>
                        </div>
                    </div>

                    {/* Grid Skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex flex-col gap-4">
                                <div className="aspect-[4/5] bg-stone-200 rounded-2xl w-full"></div>
                                <div className="flex flex-col gap-2">
                                    <div className="h-3 w-16 bg-stone-200 rounded"></div>
                                    <div className="h-5 w-3/4 bg-stone-200 rounded"></div>
                                    <div className="h-6 w-20 bg-stone-200 rounded mt-2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
