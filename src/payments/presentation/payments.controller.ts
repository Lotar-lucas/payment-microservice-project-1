import { Controller, Get } from '@nestjs/common';

@Controller('payments')
export class PaymentsController {
  @Get()
  get(): string {
    return 'Payments endpoint';
  }
}
