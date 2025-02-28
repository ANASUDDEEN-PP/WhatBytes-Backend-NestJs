import { PrismaService } from 'src/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    validate(payload: {
        email: string;
    }): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }>;
}
export {};
