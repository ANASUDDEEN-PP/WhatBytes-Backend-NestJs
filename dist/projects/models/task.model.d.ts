import { User } from '../../users/users.model';
import { Project } from './project.model';
export declare enum TaskStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}
export declare class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    project: Project;
    assignedUser: User;
    createdAt: Date;
}
