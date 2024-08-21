import type { Account } from 'src/domain/entity/account.entity';

export interface IAccountGateway {
  save(account: Account): Promise<void>;
  getById(account_id: string): Promise<Account>;
}
