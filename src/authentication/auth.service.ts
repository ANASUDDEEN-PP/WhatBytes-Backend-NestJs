import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service"; // Corrected typo in 'PrismaServie' to 'PrismaService'
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from "./dto/register-user.dto";
import { Users } from "src/users/users.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService, // Corrected 'PrismaServie' to 'PrismaService'
    private readonly jwtService: JwtService, // Corrected variable name to follow proper naming conventions
    private readonly userService: UsersService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      throw new NotFoundException('Invalid email or password');
    }

    return {
      token: this.jwtService.sign({ email }),
    };
  }

  async register(createDto: RegisterUserDto): Promise<any> {
    const createUser = new Users();
    createUser.name = createDto.name;
    createUser.email = createDto.email;
    createUser.password = await bcrypt.hash(createDto.password, 10);

    const user = await this.userService.createUser(createUser);

    return {
      token: this.jwtService.sign({
        email: user.email,
      }),
    };
  }
}
