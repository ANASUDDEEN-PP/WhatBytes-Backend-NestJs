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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const projects_service_1 = require("./projects.service");
const create_project_dto_1 = require("./dto/create-project.dto");
const update_project_dto_1 = require("./dto/update-project.dto");
let ProjectsController = class ProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    async createProject(createProjectDto) {
        try {
            return await this.projectsService.create(createProjectDto);
        }
        catch (error) {
            throw new common_1.HttpException('Project creation failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllProjects() {
        try {
            return await this.projectsService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch projects', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getProjectById(id) {
        const project = await this.projectsService.findOne(id);
        if (!project) {
            throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
        }
        return project;
    }
    async updateProject(id, updateProjectDto) {
        try {
            const updatedProject = await this.projectsService.update(id, updateProjectDto);
            if (!updatedProject) {
                throw new common_1.HttpException('Project update failed', common_1.HttpStatus.NOT_FOUND);
            }
            return updatedProject;
        }
        catch (error) {
            throw new common_1.HttpException('Project update failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteProject(id) {
        try {
            await this.projectsService.remove(id);
            return;
        }
        catch (error) {
            throw new common_1.HttpException('Project deletion failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createProject", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getAllProjects", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getProjectById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "updateProject", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "deleteProject", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map