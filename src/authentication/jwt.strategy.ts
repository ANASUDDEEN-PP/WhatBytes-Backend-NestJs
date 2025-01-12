import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from "src/prisma.service"; // Corrected typo in 'PrismaServie' to 'PrismaService'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly prismaService: PrismaService) { // Corrected 'PrismaServie' to 'PrismaService'
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET, // Ensure this environment variable is set
        });
    }

    async validate(payload: { email: string }) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: payload.email,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user; // Returning the validated user
    }
}
