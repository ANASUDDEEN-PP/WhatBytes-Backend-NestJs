import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../models/task.model';

/**
 * DTO for updating an existing task
 */
export class UpdateTaskDto {
  /**
   * The title of the task (optional field, can be updated)
   * @example 'Updated Task Title'
   */
  @IsOptional()
  @IsString()
  title?: string;

  /**
   * A description of the task (optional field, can be updated)
   * @example 'Updated task description.'
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * The status of the task (optional field, can be updated)
   * @example 'IN_PROGRESS'
   */
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
