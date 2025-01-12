import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ProjectStatus } from '../../projects/models/project-status.enum'; // Correct import path

/**
 * DTO for creating a project
 */
export class CreateProjectDto {
  /**
   * The name of the project
   * @example 'New Project'
   */
  @IsString()
  name: string;

  /**
   * A brief description of the project
   * @example 'This is a description of the project.'
   */
  @IsString()
  description: string;

  /**
   * The status of the project (e.g., 'ACTIVE', 'COMPLETED')
   */
  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  /**
   * The ID of the user creating the project (optional)
   * @example 'user-123'
   */
  @IsOptional()
  userId?: string; // Optional user ID in case the project is created by an authenticated user
}
