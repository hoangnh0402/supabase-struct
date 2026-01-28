export interface UserProfileDTO {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
}

export interface UpdateUserProfileDTO {
    userId: string;
    name?: string;
    avatarUrl?: string;
}
