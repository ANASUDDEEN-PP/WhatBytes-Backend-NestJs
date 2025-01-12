import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user.dto";
import { Response } from "express";
import { RegisterUserDto } from "./dto/register-user.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(response: Response, loginDto: LoginDto): Promise<any>;
    register(response: Response, registerDto: RegisterUserDto): Promise<any>;
}
