import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ProjectsService } from '../projects/projects.service';
export declare class TasksController {
    private readonly tasksService;
    private readonly projectsService;
    constructor(tasksService: TasksService, projectsService: ProjectsService);
    createTask(projectId: string, createTaskDto: CreateTaskDto): Promise<{
        message: string;
        task: import("./models/task.model").Task;
    }>;
}
