import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    
    // Handle password hashing properly
    const hashPassword = await bcrypt.hash(password, 10); // Example for password hashing
  
    return await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword, // Store hashed password
        // Include other fields if necessary like tasks, projects, etc.
      },
      include: {
        projects: true, // Include related projects
        tasks: true, // Include related tasks
      },
    });
  }
  
  // Fix for missing fields when querying users
  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      include: {
        projects: true, // Include related projects
        tasks: true, // Include related tasks
      },
    });
  }
  

  // Find a user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        projects: true, // Include related projects
        tasks: true, // Include related tasks
      },
    });
  }

  // Find a single user by ID
  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        projects: true, // Include related projects
        tasks: true, // Include related tasks
      },
    });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return user;
  }

  // Update a user by ID
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
      include: {
        projects: true, // Include related projects
        tasks: true, // Include related tasks
      },
    });

    if (!existingUser) {
      throw new Error(`User with id ${id} not found`);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // Delete a user by ID
  async remove(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        projects: true, // Include related projects
        tasks: true, // Include related tasks
      },
    });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    await this.prisma.user.delete({
      where: { id },
    });
  }
}
