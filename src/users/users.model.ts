import { Prisma } from '@prisma/client';

export class Users implements Prisma.UserCreateInput {
  name: string;
  email: string;
  createdAt?: Date; // Optional to align with Prisma's behavior
  password: string;
}
