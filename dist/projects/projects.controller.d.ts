import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './models/project.model';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    createProject(createProjectDto: CreateProjectDto): Promise<Project>;
    getAllProjects(): Promise<Project[]>;
    getProjectById(id: string): Promise<Project>;
    updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>;
    deleteProject(id: string): Promise<void>;
}
