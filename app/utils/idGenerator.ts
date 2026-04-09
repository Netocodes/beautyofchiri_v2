// utils/idGenerators.ts

/**
 * Get initials from a product name.
 * "Brightening Face Cream" -> "BFC"
 */
export function getProductInitials(name: string): string {
    return name
        .trim()
        .split(/\s+/) // split on any whitespace
        .map((word) => word[0]?.toUpperCase() ?? "")
        .join("");
}

/**
 * Generate a premium-looking product_id.
 *
 * Format: boc-<INITIALS>-<3_DIGITS>
 * Example: boc-BFC-392
 */
export function generateProductId(productName: string): string {
    const initials = getProductInitials(productName);

    // random 3-digit number 000–999
    const random = String(Math.floor(Math.random() * 1000)).padStart(3, "0");

    return `boc-${initials}-${random}`;
}

/**
 * Generate a variant ID linked to the product name.
 *
 * Format: var-<INITIALS>-<INDEX>
 * Example for "Brightening Face Cream":
 *   var-BFC-1, var-BFC-2, ...
 */
export function generateVariantId(
    productName: string,
    index: number
): string {
    const initials = getProductInitials(productName);
    return `var-${initials}-${index + 1}`;
}

/**
 * Generate a human-readable variant code tied to product_id.
 *
 * productId format assumed: boc-<INITIALS>-<3_DIGITS>
 * Example:
 *   productId: "boc-BFC-392"
 *   index: 0,1,2
 *   -> "BFC-392-1", "BFC-392-2", ...
 */
export function generateVariantCode(
    productId: string,
    index: number
): string {
    const parts = productId.split("-");
    // ["boc", "BFC", "392"]
    const initials = parts[1] ?? "";
    const num = parts[2] ?? "";

    return `${initials}-${num}-${index + 1}`;
}