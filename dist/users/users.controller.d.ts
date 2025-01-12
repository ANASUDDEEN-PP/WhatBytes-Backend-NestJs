import { UsersService } from "./users.service";
import { Request, Response } from "express";
export declare class UserController {
    private readonly userService;
    constructor(userService: UsersService);
    getAllUsers(request: Request, response: Response): Promise<any>;
}
