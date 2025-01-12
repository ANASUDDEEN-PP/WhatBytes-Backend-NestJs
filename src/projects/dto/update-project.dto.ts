import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ProjectStatus } from '../models/project-status.enum';

/**
 * DTO for updating an existing project
 */
export class UpdateProjectDto {
  /**
   * The name of the project (optional field, can be updated)
   * @example 'Updated Project Name'
   */
  @IsString()
  @IsOptional()
  name?: string;

  /**
   * A brief description of the project (optional field, can be updated)
   * @example 'This is an updated description of the project.'
   */
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * The status of the project (optional field, can be updated)
   * @example 'ACTIVE'
   */
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;

  /**
   * The ID of the user reassigned to the project (optional field)
   * @example 'user-123'
   */
  @IsOptional()
  userId?: string; // If the project is reassigned
}
