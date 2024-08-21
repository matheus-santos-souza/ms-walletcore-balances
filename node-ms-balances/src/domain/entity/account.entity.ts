interface IAccountProps {
  id: string;
  balance: number;
  created_at?: number;
  updated_at?: number;
}

export class Account {
  private _id: string;
  private _balance: number;
  private _created_at: number;
  private _updated_at: number;

  constructor(account: IAccountProps) {
    this._id = account.id;
    this._balance = account.balance;
    this._created_at = account?.created_at || Date.now();
    this._updated_at = account?.updated_at || Date.now();
  }

  changeBalance(balance: number): void {
    this._balance = balance;
  }

  get id(): string {
    return this._id;
  }

  get balance(): number {
    return this._balance;
  }

  get created_at(): number {
    return this._created_at;
  }

  get updated_at(): number {
    return this._updated_at;
  }
}
