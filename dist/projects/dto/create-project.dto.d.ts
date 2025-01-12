import { ProjectStatus } from '../../projects/models/project-status.enum';
export declare class CreateProjectDto {
    name: string;
    description: string;
    status: ProjectStatus;
    userId?: string;
}
