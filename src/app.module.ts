import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';
// import { PaymentsController } from './payments/presentation/payments.controller';
// import { PaymentsService } from './payments';

@Module({
  imports: [PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
