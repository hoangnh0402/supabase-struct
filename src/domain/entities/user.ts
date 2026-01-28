import { Entity } from "./entity";

export interface UserProps {
    email: string;
    name: string;
    avatarUrl?: string;
    createdAt: Date;
}

export class User extends Entity<UserProps> {
    private constructor(props: UserProps, id?: string) {
        super(props, id);
    }

    public static create(props: UserProps, id?: string): User {
        // Enforce creation rules here if any
        return new User(props, id);
        // Note: complex validation can be delegated to a validator service or value objects
    }

    public get email(): string {
        return this.props.email;
    }

    public get name(): string {
        return this.props.name;
    }

    public get avatarUrl(): string | undefined {
        return this.props.avatarUrl;
    }

    public changeName(newName: string): void {
        if (!newName || newName.length < 2) {
            throw new Error("Name must be at least 2 characters long.");
        }
        this.props.name = newName;
    }

    public updateAvatar(url: string): void {
        this.props.avatarUrl = url;
    }
}
