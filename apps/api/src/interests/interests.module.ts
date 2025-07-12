import { Module } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { InterestsController } from './interests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Interest, InterestSchema } from './schemas/interest.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Interest.name, schema: InterestSchema }]),
    AuthModule,
  ],
  controllers: [InterestsController],
  providers: [InterestsService],
})
export class InterestsModule {}
