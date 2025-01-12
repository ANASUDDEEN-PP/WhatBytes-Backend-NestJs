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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const { name, email, password } = createUserDto;
        const hashPassword = await bcrypt.hash(password, 10);
        return await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
            },
            include: {
                projects: true,
                tasks: true,
            },
        });
    }
    async findAll() {
        return await this.prisma.user.findMany({
            include: {
                projects: true,
                tasks: true,
            },
        });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
            include: {
                projects: true,
                tasks: true,
            },
        });
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                projects: true,
                tasks: true,
            },
        });
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { id },
            include: {
                projects: true,
                tasks: true,
            },
        });
        if (!existingUser) {
            throw new Error(`User with id ${id} not found`);
        }
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }
    async remove(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                projects: true,
                tasks: true,
            },
        });
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        await this.prisma.user.delete({
            where: { id },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map