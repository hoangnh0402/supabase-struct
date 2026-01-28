import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "../di/container";
import { UpdateUserProfileDTO } from "../application/dto/user.dto";

// Keys for React Query cache
export const userKeys = {
    all: ["users"] as const,
    profile: (id: string) => [...userKeys.all, "profile", id] as const,
};

export const useUserProfile = (userId: string) => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: userKeys.profile(userId),
        queryFn: () => container.getGetUserProfileUseCase().execute(userId),
        enabled: !!userId,
    });

    const updateMutation = useMutation({
        mutationFn: (dto: UpdateUserProfileDTO) =>
            container.getUpdateUserProfileUseCase().execute(dto),
        onSuccess: () => {
            // Invalidate cache to refetch fresh data
            queryClient.invalidateQueries({ queryKey: userKeys.profile(userId) });
        },
    });

    return {
        user: query.data,
        isLoading: query.isLoading,
        error: query.error,
        updateProfile: updateMutation.mutate,
        isUpdating: updateMutation.isPending,
    };
};
