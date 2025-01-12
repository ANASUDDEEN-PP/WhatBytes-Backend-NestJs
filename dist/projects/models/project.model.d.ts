import { User } from '../../users/users.model';
import { ProjectStatus } from '../../projects/models/project-status.enum';
import { Task } from '../models/task.model';
export declare class Project {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
    user: User;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    tasks: Task[];
}
