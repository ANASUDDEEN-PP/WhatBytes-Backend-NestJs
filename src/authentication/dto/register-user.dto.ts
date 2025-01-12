import { IsString, Length, IsEmail } from "class-validator";

export class RegisterUserDto {
    @IsString()
    @Length(5, 50) // Adjusted to allow more flexibility for name length
    name: string;

    @IsEmail() // Added for stricter email validation
    @Length(5, 50) // Adjusted length for real-world email ranges
    email: string;

    @IsString()
    @Length(6, 50) // Adjusted length for stronger password support
    password: string;
}
