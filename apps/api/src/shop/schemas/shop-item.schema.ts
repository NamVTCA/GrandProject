import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ItemType {
  AVATAR_FRAME = 'AVATAR_FRAME',
  PROFILE_BACKGROUND = 'PROFILE_BACKGROUND',
  PREMIUM_SUBSCRIPTION = 'PREMIUM_SUBSCRIPTION',
}

@Schema({ timestamps: true })
export class ShopItem {
  @Prop({ required: true, trim: true }) name: string;
  @Prop({ required: true }) description: string;
  @Prop({ required: true, enum: ItemType }) type: ItemType;
  @Prop({ required: true }) price: number; // Giá bằng tiền thật
  @Prop({ required: true, default: 'VND' }) currency: string;
  @Prop() assetUrl?: string;
}
export const ShopItemSchema = SchemaFactory.createForClass(ShopItem);
export type ShopItemDocument = ShopItem & Document;
