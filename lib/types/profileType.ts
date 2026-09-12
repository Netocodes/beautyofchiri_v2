export type profile = {
    id: number;
    full_name: string;
    avatar_url: string;
    role: string;
    email: string;
    onboarding_completed: boolean;
    created_at: string;
    updated_at: string;
}
export type profileResponse = {
    user: profile;
    message: string;
}