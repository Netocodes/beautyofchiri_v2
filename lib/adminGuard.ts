export function verifyUser(req: Request) {
    const adminKey = req.headers.get("x-admin-secret");

    if (!adminKey || adminKey !== process.env.ADMIN_SECRET) {
        return false;
    }  // diffrenciate from admin and customers in the data

    return true;
}