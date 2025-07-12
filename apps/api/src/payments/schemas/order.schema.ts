import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../auth/schemas/user.schema';
import { ShopItem } from '../../shop/schemas/shop-item.schema';

export enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopItem',
  })
  item: ShopItem;
  @Prop({ required: true }) amount: number;
  @Prop({ required: true, enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
export type OrderDocument = Order & Document;
