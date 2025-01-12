import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JwtAuthGuard protects routes that require JWT-based authentication.
 * It leverages the 'jwt' strategy defined in the AuthModule.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
