import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination"

interface DynamicPaginationProps {
    pagination: {
        page: number
        pageSize: number
        total: number
        totalPages: number
    }
}

export function CustomPagination({ pagination }: DynamicPaginationProps) {
    const { page: currentPage, totalPages } = pagination

    // Don't render pagination if there's only 1 page or no data
    if (totalPages <= 1) return null

    // Function to build page URL while preserving other filters/params
    const createPageUrl = (pageNumber: number | string) => {
        return `/browse?page=${pageNumber}`
    }

    // Generate array of page numbers to render
    const getPageNumbers = () => {
        const pages: (number | string)[] = []

        // Always show page 1
        pages.push(1)

        // Add ellipsis if current page is further out
        if (currentPage > 3) {
            pages.push("ellipsis-start")
        }

        // Add pages around current page
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            if (!pages.includes(i)) {
                pages.push(i)
            }
        }

        // Add ellipsis before last page if needed
        if (currentPage < totalPages - 2) {
            pages.push("ellipsis-end")
        }

        // Always show last page
        if (totalPages > 1 && !pages.includes(totalPages)) {
            pages.push(totalPages)
        }

        return pages
    }

    return (
        <Pagination className="my-8">
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
                        aria-disabled={currentPage <= 1}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>

                {/* Dynamic Page Numbers */}
                {getPageNumbers().map((pageItem, idx) => {
                    if (typeof pageItem === "string") {
                        return (
                            <PaginationItem key={`${pageItem}-${idx}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )
                    }

                    return (
                        <PaginationItem key={pageItem}>
                            <PaginationLink
                                href={createPageUrl(pageItem)}
                                isActive={currentPage === pageItem}
                            >
                                {pageItem}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}

                {/* Next Button */}
                <PaginationItem>
                    <PaginationNext
                        href={currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"}
                        aria-disabled={currentPage >= totalPages}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}