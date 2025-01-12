import { PrismaService } from "src/prisma.service"; // Corrected typo 'PrismaServie' to 'PrismaService'
import { Users } from "./users.model";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {} // Corrected 'PrismaServie' to 'PrismaService'

    async getAllUsers(): Promise<Users[]> { // Corrected method name to 'getAllUsers' (plural)
        return this.prisma.user.findMany();
    }

    async createUser(data: Users): Promise<Users> {
        const existing = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        
        if (existing) { // The check for 'existing' should throw an exception if the user exists, not if it doesn't exist
            throw new ConflictException('Email already exists');
        }

        return this.prisma.user.create({
            data,
        });
    }
}
