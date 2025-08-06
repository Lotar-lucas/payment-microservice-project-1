import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Payment } from '@prisma/client';
import { PaymentRepositoryPort } from '../domain/payment.repository';

@Injectable()
export class PrismaPaymentRepository implements PaymentRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    orderId: string;
    amount: number;
    idempotencyKey: string;
  }): Promise<Payment> {
    return this.prisma.payment.upsert({
      where: { idempotencyKey: data.idempotencyKey },
      update: {},
      create: {
        orderId: data.orderId,
        amount: data.amount,
        status: 'pending',
        idempotencyKey: data.idempotencyKey,
      },
    });
  }

  async findById(id: string): Promise<Payment | null> {
    return this.prisma.payment.findUnique({ where: { id } });
  }

  // Outros métodos de repositório...
}
