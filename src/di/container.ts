import { GetUserProfileUseCase } from "../application/use-cases/get-user-profile";
import { UpdateUserProfileUseCase } from "../application/use-cases/update-user-profile";
import { SupabaseUserRepository } from "../infrastructure/supabase/user.repository.impl";

class DIContainer {
    private static _userRepository = new SupabaseUserRepository();

    static getGetUserProfileUseCase(): GetUserProfileUseCase {
        return new GetUserProfileUseCase(this._userRepository);
    }

    static getUpdateUserProfileUseCase(): UpdateUserProfileUseCase {
        return new UpdateUserProfileUseCase(this._userRepository);
    }
}

export const container = DIContainer;
