import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
// import { PaymentsController } from './payments/presentation/payments.controller';
// import { PaymentsService } from './payments';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PaymentsModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
