import { TaskStatus } from '../models/task.model';
export declare class CreateTaskDto {
    title: string;
    description: string;
    status: TaskStatus;
    projectId?: string;
    assignedUserId?: string;
}
