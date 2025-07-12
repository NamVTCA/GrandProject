import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Interest } from '../../interests/schemas/interest.schema';
import { ShopItem } from '../../shop/schemas/shop-item.schema';

export enum GlobalRole {
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}

export enum AccountType {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
}

export enum PresenceStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export type UserDocument = User & Document & { _id: Types.ObjectId };

@Schema({ _id: false }) // _id: false để không tạo _id cho schema con này
export class GameStatus {
  @Prop({ enum: GlobalRole, default: GlobalRole.USER })
  globalRole: GlobalRole;

  @Prop()
  igdbId: string;

  @Prop()
  name: string;

  @Prop()
  boxArtUrl: string;
}

@Schema({ timestamps: true })
export class User {
  
  @Prop({ enum: PresenceStatus, default: PresenceStatus.ONLINE })
  presenceStatus: PresenceStatus;

  @Prop({ required: true, unique: true, trim: true, index: true })
  username: string;

  @Prop({ required: true, unique: true, trim: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'default_avatar.png' })
  avatar: string;

  @Prop()
  birthday: Date;

  @Prop({ default: '' })
  bio: string;

  @Prop({ default: 'default_cover.png' })
  coverImage: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  followers: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  following: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interest' }] })
  interests: Interest[];

  @Prop({ enum: AccountType, default: AccountType.FREE })
  accountType: AccountType;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopItem',
    required: false,
  })
  equippedAvatarFrame?: ShopItem;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopItem',
    required: false,
  })
  equippedProfileBackground?: ShopItem;

  @Prop({ type: GameStatus, required: false })
  currentGame?: GameStatus;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop()
  passwordResetToken?: string;

  @Prop()
  passwordResetExpires?: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  friends: User[]; // Danh sách bạn bè

  @Prop({ default: false })
  hasSelectedInterests: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
