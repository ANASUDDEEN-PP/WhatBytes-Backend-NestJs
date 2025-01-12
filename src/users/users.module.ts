import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma.service"; // Corrected typo 'PrismaServie' to 'PrismaService'

@Module({
  controllers: [UserController],
  providers: [UsersService, PrismaService], // Corrected typo 'PrismaServie' to 'PrismaService'
})
export class UsersModule {}
