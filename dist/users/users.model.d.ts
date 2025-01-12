import { Prisma } from '@prisma/client';
export declare class Users implements Prisma.UserCreateInput {
    name: string;
    email: string;
    createdAt?: Date;
    password: string;
}
