import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.model'; // Path to the User entity
import { Project } from '../projects/models/project.model'; // Path to the Project entity
import { Task } from '../projects/models/task.model'; // Path to the Task entity
import { ConfigModule, ConfigService } from '@nestjs/config'; // Using ConfigModule for environment variables

@Module({
  imports: [
    ConfigModule, // Make sure to import ConfigModule to access env variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule for async DB config
      inject: [ConfigService], // Inject ConfigService for env access
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'), // Default to localhost if not set
        port: configService.get<number>('DB_PORT', 5432), // Default to 5432 if not set
        username: configService.get<string>('DB_USERNAME', 'postgres'), // Default to postgres if not set
        password: configService.get<string>('DB_PASSWORD', 'anas'), // Default to anas if not set
        database: configService.get<string>('DB_NAME', 'project-management'), // Default to project-management if not set
        entities: [User, Project, Task], // Include all entities (User, Project, Task)
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE', true), // Set synchronize based on env
        // Make sure synchronize is false in production (can lead to data loss)
      }),
    }),
    TypeOrmModule.forFeature([User, Project, Task]), // Make entities available for injection
  ],
  exports: [TypeOrmModule], // Export TypeOrmModule for use in other modules
})
export class DatabaseModule {}
