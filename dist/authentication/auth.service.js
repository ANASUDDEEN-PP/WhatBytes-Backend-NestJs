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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma.service");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const users_model_1 = require("../users/users.model");
let AuthService = class AuthService {
    constructor(prismaService, jwtService, userService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.NotFoundException('Invalid email or password');
        }
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            throw new common_1.NotFoundException('Invalid email or password');
        }
        return {
            token: this.jwtService.sign({ email }),
        };
    }
    async register(createDto) {
        const createUser = new users_model_1.Users();
        createUser.name = createDto.name;
        createUser.email = createDto.email;
        createUser.password = await bcrypt.hash(createDto.password, 10);
        const user = await this.userService.createUser(createUser);
        return {
            token: this.jwtService.sign({
                email: user.email,
            }),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map