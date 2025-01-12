import { TaskStatus } from '../models/task.model';
export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
}
