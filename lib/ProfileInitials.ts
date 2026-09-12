export default function getInitials(fullName: string | null | undefined): string {
    if (!fullName) return "";

    // Remove extra whitespace and split into words
    const names = fullName.trim().split(/\s+/);

    if (names.length === 0 || !names[0]) return "";

    // If only one name is provided (e.g. "Netochukwu")
    if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
    }

    // Get first letter of first name and first letter of last name
    const firstNameLetter = names[0].charAt(0);
    const lastNameLetter = names[names.length - 1].charAt(0);

    return `${firstNameLetter}${lastNameLetter}`.toUpperCase();
}