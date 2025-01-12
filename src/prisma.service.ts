import { INestApplication, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient implements OnModuleInit {
    // This method is called when the module is initialized
    async onModuleInit() {
        await this.$connect(); // Ensure connection is established
    }

    // Enable shutdown hooks for graceful termination of Prisma connection
    async enableShutdownHooks(app: INestApplication) {
        // Casting `$on` to `any` allows the 'beforeExit' event to be recognized
        (this.$on as any)('beforeExit', async () => {
            await app.close(); // Close the NestJS app when Prisma disconnects
        });
    }
}
