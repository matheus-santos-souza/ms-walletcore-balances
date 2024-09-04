import { Injectable } from '@nestjs/common';
import { Account } from 'src/domain/entity/account.entity';
import { IAccountGateway } from 'src/domain/gateway/account.gateway';
import prismaClient from '../prisma';

@Injectable()
export class AccountRepository implements IAccountGateway {
  constructor() {}

  async save(account: Account): Promise<void> {
    await prismaClient.account.upsert({
      create: {
        id: account.id,
        balance: account.balance,
        created_at: account.created_at,
        updated_at: Date.now(),
      },
      update: {
        balance: account.balance,
        updated_at: Date.now(),
      },
      where: {
        id: account.id,
      },
    });
  }

  async getById(account_id: string): Promise<Account> {
    const account = await prismaClient.account.findFirst({
      where: {
        id: account_id,
      },
    });

    if (!account) {
      throw new Error('Account not exists!');
    }

    return new Account({
      id: account.id,
      balance: Number(account.balance),
      created_at: Number(account.created_at),
      updated_at: Number(account.updated_at),
    });
  }
}
