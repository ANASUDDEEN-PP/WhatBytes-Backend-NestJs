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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProjectDto) {
        const { name, description, status, userId } = createProjectDto;
        return await this.prisma.project.create({
            data: {
                name,
                description,
                status,
                userId,
            },
            include: {
                user: true,
                tasks: true,
            },
        });
    }
    async findAll() {
        return await this.prisma.project.findMany({
            include: {
                user: true,
                tasks: true,
            },
        });
    }
    async findOne(id) {
        const project = await this.prisma.project.findUnique({
            where: { id },
            include: {
                user: true,
                tasks: true,
            },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with id ${id} not found`);
        }
        return project;
    }
    async update(id, updateProjectDto) {
        const existingProject = await this.prisma.project.findUnique({
            where: { id },
            include: {
                user: true,
                tasks: true,
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
    async remove(id) {
        const project = await this.prisma.project.findUnique({
            where: { id },
            include: {
                user: true,
                tasks: true,
            },
        });
        if (!project) {
            throw new Error(`Project with id ${id} not found`);
        }
        await this.prisma.project.delete({
            where: { id },
        });
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map