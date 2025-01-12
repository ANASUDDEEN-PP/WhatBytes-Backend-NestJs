import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Project } from './models/project.model';
import { Task } from './models/task.model';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a project
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { name, description, status, userId } = createProjectDto;
  
    return await this.prisma.project.create({
      data: {
        name,
        description,
        status, // Make sure status is of type ProjectStatus (enum)
        userId,
        // You may need to handle other fields like tasks here if required
      },
      include: {
        user: true, // Ensure the related user is included
        tasks: true, // Ensure tasks are included
      },
    });
  }
  
  // Fix for missing fields when querying projects
  async findAll(): Promise<Project[]> {
    return await this.prisma.project.findMany({
      include: {
        user: true, // Include related user
        tasks: true, // Include related tasks
      },
    });
  }
  
  // Fix for missing fields when querying a single project
  async findOne(id: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        user: true, // Include related user
        tasks: true, // Include related tasks
      },
    });
  
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
  
    return project;
  }

  // Update a project by ID
  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const existingProject = await this.prisma.project.findUnique({
      where: { id },
      include: {
        user: true,   // Include related user
        tasks: true,  // Include related tasks
      },
    });

    if (!existingProject) {
      throw new Error(`Project with id ${id} not found`);
    }

    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  // Delete a project by ID
  async remove(id: string): Promise<void> {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        user: true,   // Include related user
        tasks: true,  // Include related tasks
      },
    });

    if (!project) {
      throw new Error(`Project with id ${id} not found`);
    }

    await this.prisma.project.delete({
      where: { id },
    });
  }
}
