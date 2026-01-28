import { IUserRepository } from "../../interfaces/repositories/user.repository";
import { User, UserProps } from "../../domain/entities/user";
import { getSupabaseClient } from "./supabase.client";

export class SupabaseUserRepository implements IUserRepository {
    private get client() {
        return getSupabaseClient();
    }

    async findById(id: string): Promise<User | null> {
        const { data, error } = await this.client
            .from("users")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) {
            // Handle error or return null
            return null;
        }

        // Map DB row to Entity props
        const props: UserProps = {
            email: data.email,
            name: data.name,
            avatarUrl: data.avatar_url, // accessing raw DB column format
            createdAt: new Date(data.created_at),
        };

        return User.create(props, data.id);
    }

    async save(user: User): Promise<void> {
        const { id, email, name, avatarUrl } = {
            id: user.id,
            email: user.email,
            name: user.name,
            avatarUrl: user.avatarUrl
        };

        // Prepare data for DB (snake_case columns assumed)
        const dbRow = {
            id: id,
            email: email,
            name: name,
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString(),
        };

        const { error } = await this.client
            .from("users")
            .upsert(dbRow);

        if (error) {
            throw new Error(`Failed to save user: ${error.message}`);
        }
    }
}
