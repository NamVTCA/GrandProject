// apps/api/src/shop/shop.module.ts

import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { PaymentsModule } from '../payments/payments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopItem, ShopItemSchema } from './schemas/shop-item.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShopItem.name, schema: ShopItemSchema }
    ]), 
    PaymentsModule,
    AuthModule, // Cần cho JwtAuthGuard trong controller
  ],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}