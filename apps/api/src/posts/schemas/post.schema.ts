import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../auth/schemas/user.schema';
import { Group } from '../../groups/schemas/group.schema';

export type PostDocument = Post & Document;

export enum ModerationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PROCESSING = 'PROCESSING', // Trạng thái mới cho video
}

@Schema({ timestamps: true })
export class Post {
  @Prop({ enum: ModerationStatus, default: ModerationStatus.PENDING })
  moderationStatus: ModerationStatus;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User; // Tác giả bài viết

  @Prop({ required: true, trim: true })
  content: string; // Nội dung text

  @Prop([String])
  mediaUrls: string[]; // Mảng chứa URL của ảnh/video

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  likes: User[]; // Những người đã thích bài viết

  // Chúng ta sẽ tạo CommentSchema riêng và tham chiếu sau
  @Prop({ default: 0 })
  commentCount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: false })
  group?: Group; // Bài đăng này thuộc về nhóm nào (không bắt buộc)

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: false })
  repostOf?: Post;

  @Prop({ default: 0 })
  repostCount: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
