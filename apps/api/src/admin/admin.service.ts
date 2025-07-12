import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, GlobalRole } from '../auth/schemas/user.schema';

@Injectable()
export class AdminService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().select('-password').exec();
    }

    async updateUserRole(userId: string, role: GlobalRole): Promise<User> {
        const user = await this.userModel.findByIdAndUpdate(userId, { globalRole: role }, { new: true });
        if (!user) {
            throw new NotFoundException('Không tìm thấy người dùng.');
        }
        return user;
    }
}
