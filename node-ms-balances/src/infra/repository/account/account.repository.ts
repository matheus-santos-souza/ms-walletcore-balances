import { Injectable } from '@nestjs/common';
import { Account } from 'src/domain/entity/account.entity';
import type { IAccountGateway } from 'src/domain/gateway/account.gateway';
@Injectable()
export class AccountRepository implements IAccountGateway {
  constructor() {}

  async save(account: Account): Promise<void> {
    /* this.accountsRepository.save({
      id: account.id,
      balance: account.balance,
      created_at: account.created_at,
      updated_at: account.updated_at,
    }); */
  }

  async getById(account_id: string): Promise<Account> {
    throw new Error('');
    /* const account = await this.accountsRepository.findOneBy({ id: account_id });
    if (!account) {
      throw new Error('Account not exists!');
    }
    return new Account({
      id: account.id,
      balance: account.balance,
      created_at: account.created_at,
      updated_at: account.updated_at,
    }); */
  }
}
