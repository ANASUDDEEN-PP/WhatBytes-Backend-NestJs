import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user.dto";
import { Response } from "express";
import { RegisterUserDto } from "./dto/register-user.dto";

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Res() response: Response, @Body() loginDto: LoginDto): Promise<any> {
    try {
      const result = await this.authService.login(loginDto);
      return response.status(200).json({
        status: 'success',
        message: 'Login successful',
        result: result,
      });
    } catch (err) {
      console.error('Login Error:', err.message); // Log error for debugging
      return response.status(500).json({
        status: 'error',
        message: 'Internal server error during login',
        error: err.message, // Optional: Include error details for easier debugging
      });
    }
  }

  @Post('/register')
  async register(@Res() response: Response, @Body() registerDto: RegisterUserDto): Promise<any> {
    try {
      const result = await this.authService.register(registerDto); // Call the correct method
      return response.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        result: result,
      });
    } catch (err) {
      console.error('Registration Error:', err.message); // Log error for debugging
      return response.status(500).json({
        status: 'error',
        message: 'Internal server error during registration',
        error: err.message, // Optional: Include error details for easier debugging
      });
    }
  }
}
