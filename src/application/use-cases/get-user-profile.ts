import { IUserRepository } from "../../interfaces/repositories/user.repository";
import { UserProfileDTO } from "../dto/user.dto";
import { UseCase } from "./use-case";

export class GetUserProfileUseCase implements UseCase<string, UserProfileDTO | null> {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(userId: string): Promise<UserProfileDTO | null> {
        const user = await this.userRepository.findById(userId);
        if (!user) return null;

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            avatarUrl: user.avatarUrl,
        };
    }
}
