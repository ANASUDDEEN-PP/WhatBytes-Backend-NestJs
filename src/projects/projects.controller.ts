import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './models/project.model';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      return await this.projectsService.create(createProjectDto);
    } catch (error) {
      throw new HttpException('Project creation failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAllProjects(): Promise<Project[]> {
    try {
      return await this.projectsService.findAll();
    } catch (error) {
      throw new HttpException('Failed to fetch projects', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string): Promise<Project> {
    const project = await this.projectsService.findOne(id);
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    return project;
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    try {
      const updatedProject = await this.projectsService.update(id, updateProjectDto);
      if (!updatedProject) {
        throw new HttpException('Project update failed', HttpStatus.NOT_FOUND);
      }
      return updatedProject;
    } catch (error) {
      throw new HttpException('Project update failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
async deleteProject(@Param('id') id: string): Promise<void> {
  try {
    await this.projectsService.remove(id); // This will return void
    return; // Simply return after deletion is successful
  } catch (error) {
    throw new HttpException('Project deletion failed', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
}
