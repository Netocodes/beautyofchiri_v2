// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Skeleton } from "@/ui/skeleton"

import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function ProductCardSkeleton() {
    return (
        <Card className="w-full max-w-xs rounded-xl">
            <CardHeader>
                <Skeleton className="aspect-video w-full" />
            </CardHeader>
            <CardContent className=" w-full grid grid-cols-[2fr_1fr] gap-x-2">
                <Skeleton className="h-4 " />
                <Skeleton className="h-4 " />
                <Skeleton className="h-7 rounded-md col-span-2 mt-3" />
            </CardContent>
        </Card>
    )
}
