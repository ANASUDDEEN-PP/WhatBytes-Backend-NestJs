import { ProjectStatus } from '../models/project-status.enum';
export declare class UpdateProjectDto {
    name?: string;
    description?: string;
    status?: ProjectStatus;
    userId?: string;
}
