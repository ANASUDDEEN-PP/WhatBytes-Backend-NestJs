import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'Name must be a string.' })
  @Length(5, 50, { message: 'Name must be between 5 and 50 characters.' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  @Length(5, 50, { message: 'Email must be between 5 and 50 characters.' })
  email: string;

  @IsString({ message: 'Password must be a string.' })
  @Length(6, 50, { message: 'Password must be between 6 and 50 characters.' })
  password: string;
}
