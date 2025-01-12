"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TasksService = class TasksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTaskDto) {
        const { title, description, status, projectId, assignedUserId } = createTaskDto;
        return await this.prisma.task.create({
            data: {
                title,
                description,
                status,
                projectId,
                assignedUserId,
            },
            include: {
                project: true,
                assignedUser: true,
            },
        });
    }
    async findAll() {
        return this.prisma.task.findMany({
            include: {
                project: true,
                assignedUser: true,
            },
        });
    }
    async findOne(id) {
        const task = await this.prisma.task.findUnique({
            where: { id },
            include: {
                project: true,
                assignedUser: true,
            },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with id ${id} not found`);
        }
        return task;
    }
    async update(id, updateTaskDto) {
        const existingTask = await this.prisma.task.findUnique({
            where: { id },
            include: {
                project: true,
                assignedUser: true,
            },
        });
        if (!existingTask) {
            throw new common_1.NotFoundException(`Task with id ${id} not found`);
        }
        return this.prisma.task.update({
            where: { id },
            data: updateTaskDto,
        });
    }
    async remove(id) {
        const task = await this.prisma.task.findUnique({
            where: { id },
            include: {
                project: true,
                assignedUser: true,
            },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with id ${id} not found`);
        }
        await this.prisma.task.delete({
            where: { id },
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map