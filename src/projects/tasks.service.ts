import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Task } from './models/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a task
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status, projectId, assignedUserId } = createTaskDto;
  
    return await this.prisma.task.create({
      data: {
        title,
        description,
        status,
        projectId,
        assignedUserId,
        // Include createdAt and other necessary fields here if required
      },
      include: {
        project: true, // Include related project
        assignedUser: true, // Include assigned user
      },
    });
  }
  
  // Fix for missing fields when querying tasks
  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany({
      include: {
        project: true, // Include related project
        assignedUser: true, // Include assigned user
      },
    });
  }
  
  // Fix for missing fields when querying a single task
  async findOne(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        project: true, // Include related project
        assignedUser: true, // Include assigned user
      },
    });
  
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  
    return task;
  }

  // Update a task by ID
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.prisma.task.findUnique({
      where: { id },
      include: {
        project: true, // Include related project
        assignedUser: true, // Include assigned user
      },
    });

    if (!existingTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  // Delete a task by ID
  async remove(id: string): Promise<void> {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        project: true, // Include related project
        assignedUser: true, // Include assigned user
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    await this.prisma.task.delete({
      where: { id },
    });
  }
}
