import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShopItem, ShopItemDocument } from './schemas/shop-item.schema';
import { UserDocument } from '../auth/schemas/user.schema';
import { PaymentsService } from '../payments/payments.service';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(ShopItem.name) private shopItemModel: Model<ShopItemDocument>,
    private paymentsService: PaymentsService,
  ) {}

  async listItems(): Promise<ShopItem[]> {
    return this.shopItemModel.find().exec();
  }

  async purchaseItem(user: UserDocument, itemId: string): Promise<{ message: string; orderId: string }> {
    const item = await this.shopItemModel.findById(itemId);
    if (!item) throw new BadRequestException('Vật phẩm không tồn tại.');

    const order = await this.paymentsService.createOrder(user, item);

    return {
      message: 'Đơn hàng đã được tạo. Vui lòng hoàn tất thanh toán.',
      orderId: (order._id as string).toString(),
    };
  }
}
