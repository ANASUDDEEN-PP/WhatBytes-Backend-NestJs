import { Controller, Post, Param, Body, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ProjectsService } from '../projects/projects.service'; // Import ProjectsService to check if the project exists

@Controller('projects/:projectId/tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly projectsService: ProjectsService, // Inject ProjectsService
  ) {}

  @Post()
  async createTask(
    @Param('projectId') projectId: string, // Get projectId from the route param
    @Body() createTaskDto: CreateTaskDto,  // Get task data from the request body
  ) {
    // Check if the project exists
    const project = await this.projectsService.findOne(projectId);
    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    // Modify the createTaskDto to include the projectId
    const taskDtoWithProjectId = { ...createTaskDto, projectId };

    // Call the create method with the modified createTaskDto
    const task = await this.tasksService.create(taskDtoWithProjectId);

    return { message: 'Task created successfully', task }; // Return the created task with a success message
  }
}
