import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Correct usage of $on with event typing
  $on(event: string, callback: (...args: any[]) => void) {
    super.$on(event, callback);
  }
}
