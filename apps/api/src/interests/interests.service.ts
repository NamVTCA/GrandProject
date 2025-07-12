import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Interest, InterestDocument } from './schemas/interest.schema';

@Injectable()
export class InterestsService {
  constructor(@InjectModel(Interest.name) private interestModel: Model<InterestDocument>) {}

  async findAll(): Promise<Interest[]> {
    return this.interestModel.find().exec();
  }
}

