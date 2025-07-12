import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Endpoint này mô phỏng webhook được gọi bởi cổng thanh toán khi giao dịch thành công.
  // Trong thực tế, nó cần được bảo vệ bằng secret key.
  @Post('webhook/success')
  handleSuccessfulPayment(@Body('orderId') orderId: string) {
    return this.paymentsService.fulfillOrder(orderId);
  }
}
