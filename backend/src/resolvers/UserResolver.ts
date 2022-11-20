import { Arg, Mutation, Query, Resolver } from "type-graphql";
import crypto from 'crypto'
import { User } from "../models/User";

@Resolver()
export class UserResolver {
    private data: User[] = []

    @Query(() => [User])
    async users(): Promise<User[]> {
        return this.data
    }

    @Mutation(() => User)
    async createUser(@Arg('name') name: string): Promise<User> {
        const user = { id: crypto.randomUUID(), name }
        this.data.push(user)
        return user
    }

    @Mutation(() => Boolean!, {nullable: true})
    async deleteUser(@Arg('id') id: string): Promise<void> {
        const userToDelete = this.data.findIndex(user => user.id === id)

        if (userToDelete < 0) throw new Error("ID not exists");

        this.data.splice(userToDelete, 1)
    }

    @Mutation(() => User)
    async updateUser(
        @Arg("id") id: string,
        @Arg("name") name: string
    ): Promise<User> {
        const user = this.data.find(user => user.id === id)
        
        if (!user) {
            throw new Error("User not found")
        }

        const updatedUser = { ...user, name }

        this.data = this.data.map(user => (user.id === id ? updatedUser : user))

        return updatedUser
    }
}