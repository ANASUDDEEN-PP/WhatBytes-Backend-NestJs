import { Project } from '../projects/models/project.model';
import { Task } from '../projects/models/task.model';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    projects: Project[];
    tasks: Task[];
    hashPassword(): Promise<void>;
}
