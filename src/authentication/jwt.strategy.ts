import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma.service'; // Corrected 'PrismaServie' to 'PrismaService'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Ensures the JWT expiration is considered
      secretOrKey: process.env.JWT_SECRET, // The secret key used to sign JWT (should be in .env)
    });
  }

  /**
   * Validate the JWT payload and find the user.
   * @param payload - JWT payload containing user details
   * @returns The validated user object
   * @throws Error if user is not found
   */
  async validate(payload: { email: string }) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new Error('User not found'); // Provide a custom error message for clarity
    }

    return user; // Return the validated user from the database
  }
}
