import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-user.dto';
import { RegisterDto } from './dto/register-user.dto';
import { JwtPayload } from '../authentication/interface/jwt-payload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registers a new user
   * @param registerDto - User registration data
   * @returns JWT token
   */
  async register(registerDto: RegisterDto): Promise<{ accessToken: string }> {
    const { email, password, name } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({
      email,
      password: hashedPassword,
      name,
    });

    const payload: JwtPayload = { username: newUser.name, sub: newUser.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  /**
   * Logs in an existing user
   * @param loginDto - User login data
   * @returns JWT token
   */
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload: JwtPayload = { username: user.name, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  /**
   * Validates a user based on the JWT payload
   * @param payload - JWT payload containing user information
   * @returns User information
   */
  async validateUser(payload: JwtPayload): Promise<any> {
    return { userId: payload.sub, username: payload.username };
  }
}
