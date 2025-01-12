import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient {
    constructor();
    onModuleDestroy(): Promise<void>;
    $on(event: string, callback: (...args: any[]) => void): void;
}
