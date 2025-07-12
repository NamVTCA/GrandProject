import { Controller, Get, UseGuards, Patch, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GlobalRole } from '../auth/schemas/user.schema';
import { AdminService } from './admin.service';
import { UpdateRoleDto } from './dto/update-role.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(GlobalRole.ADMIN)
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Get('users')
    getAllUsers() {
        return this.adminService.getAllUsers();
    }

    @Patch('users/:id/role')
    updateUserRole(@Param('id') userId: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.adminService.updateUserRole(userId, updateRoleDto.role);
    }
}
