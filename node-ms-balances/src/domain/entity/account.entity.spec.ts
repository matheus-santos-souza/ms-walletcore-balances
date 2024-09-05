import { Account } from './account.entity';

describe('Account', () => {
  it('should create an account with given properties', () => {
    const accountProps = {
      id: '123',
      balance: 1000,
      created_at: 1633024800000,
      updated_at: 1633024800000,
    };

    const account = new Account(accountProps);

    expect(account.id).toBe(accountProps.id);
    expect(account.balance).toBe(accountProps.balance);
    expect(account.created_at).toBe(accountProps.created_at);
    expect(account.updated_at).toBe(accountProps.updated_at);
  });

  it('should set created_at and updated_at to current time if not provided', () => {
    const accountProps = {
      id: '123',
      balance: 1000,
    };

    const account = new Account(accountProps);
    const now = Date.now();

    expect(account.created_at).toBeLessThanOrEqual(now);
    expect(account.updated_at).toBeLessThanOrEqual(now);
  });

  it('should change the balance when changeBalance is called', () => {
    const accountProps = {
      id: '123',
      balance: 1000,
    };

    const account = new Account(accountProps);

    account.changeBalance(500);

    expect(account.balance).toBe(500);
  });
});
