import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument, OrderStatus } from './schemas/order.schema';
import { UserDocument, AccountType } from '../auth/schemas/user.schema';
import { ShopItemDocument, ItemType } from '../shop/schemas/shop-item.schema';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private inventoryService: InventoryService,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async createOrder(user: UserDocument, item: ShopItemDocument): Promise<OrderDocument> {
    const newOrder = new this.orderModel({
      user: user._id,
      item: item._id,
      amount: item.price,
      status: OrderStatus.PENDING,
    });
    return newOrder.save();
  }

  async fulfillOrder(orderId: string): Promise<{ message: string }> {
    const order = await this.orderModel.findById(orderId);

    if (!order || order.status !== OrderStatus.PENDING) {
      throw new NotFoundException('Đơn hàng không hợp lệ hoặc đã được xử lý.');
    }

    const user = await this.userModel.findById(order.user);
    const item = (await order.populate('item')).item as ShopItemDocument;

    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại.');
    }

    if (item.type === ItemType.PREMIUM_SUBSCRIPTION) {
      user.accountType = AccountType.PREMIUM;
      await user.save();
    } else {
      await this.inventoryService.addItemToInventory(user._id, item._id as string);
    }

    order.status = OrderStatus.COMPLETED;
    await order.save();

    return { message: 'Thanh toán thành công và đã nhận vật phẩm!' };
  }
}
