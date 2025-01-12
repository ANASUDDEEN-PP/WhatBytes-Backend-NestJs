import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request, Response } from "express";
import { JwtAuthGuard } from "src/authentication/auth.guard";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllUsers(@Req() request: Request, @Res() response: Response): Promise<any> {
        try {
            const result = await this.userService.getAllUsers(); // Corrected method name to 'getAllUsers'
            return response.status(200).json({
                status: 'success', // Changed 'ok!' to 'success' for clarity
                message: 'Successfully fetched data', // Updated message for better readability
                result: result
            });
        } catch (err) {
            return response.status(500).json({
                status: 'error', // Changed 'ok!' to 'error' for better error handling
                message: 'Internal Server Error',
                error: err.message || 'Unknown error', // Added error details for better debugging
            });
        }
    }
}
