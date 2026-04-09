import { ProductPayload } from "./types/productTypes"

export function toProductFormData(data: ProductPayload) {
    const fd = new FormData()

    // append normal fields as JSON
    const { images, ...rest } = data

    fd.append("data", JSON.stringify(rest))

    // append files separately
    images?.forEach((file) => {
        fd.append("images", file)
    })

    return fd
}