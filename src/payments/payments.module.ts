import { Module } from '@nestjs/common';
import { PaymentsController } from './presentation/payments.controller';
import { PaymentsService } from './application/payments.service';
import { PrismaPaymentRepository } from './infra/prisma-payment.repository';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PrismaPaymentRepository],
})
export class PaymentsModule {}
