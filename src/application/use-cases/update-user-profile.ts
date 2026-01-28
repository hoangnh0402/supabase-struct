import { IUserRepository } from "../../interfaces/repositories/user.repository";
import { UpdateUserProfileDTO } from "../dto/user.dto";
import { UseCase } from "./use-case";

export class UpdateUserProfileUseCase implements UseCase<UpdateUserProfileDTO, void> {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(request: UpdateUserProfileDTO): Promise<void> {
        const user = await this.userRepository.findById(request.userId);
        if (!user) {
            throw new Error(`User with id ${request.userId} not found`);
        }

        if (request.name) {
            user.changeName(request.name);
        }

        if (request.avatarUrl) {
            user.updateAvatar(request.avatarUrl);
        }

        await this.userRepository.save(user);
    }
}
