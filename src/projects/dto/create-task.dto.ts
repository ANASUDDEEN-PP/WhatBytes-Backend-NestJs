import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../models/task.model'; // Ensure the path is correct

/**
 * DTO for creating a new task
 */
export class CreateTaskDto {
  /**
   * The title of the task
   * @example 'Implement login functionality'
   */
  @IsString()
  title: string;

  /**
   * The description of the task
   * @example 'Develop the login page and implement authentication logic.'
   */
  @IsString()
  description: string;

  /**
   * The status of the task (e.g., 'PENDING', 'IN_PROGRESS', 'COMPLETED')
   */
  @IsEnum(TaskStatus)
  status: TaskStatus;

  /**
   * The ID of the associated project (optional)
   * @example 'project-123'
   */
  @IsOptional()
  projectId?: string; // Optional: If you want to allow creating tasks without associating them with a project immediately

  /**
   * The ID of the user assigned to the task (optional)
   * @example 'user-123'
   */
  @IsOptional()
  assignedUserId?: string; // Optional: If you want to allow assigning a user to the task
}
