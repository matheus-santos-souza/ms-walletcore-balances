import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../usecase.interface';
import { IAccountGateway } from 'src/domain/gateway/account.gateway';

export interface IGetByIdAccountInputDto {
  account_id: string;
}

export interface IGetByIdAccountOutputDto {
  id: string;
  balance: number;
  created_at: Date;
  updated_at: Date;
}

@Injectable()
export class GetByIdAccountUseCase
  implements IUseCase<IGetByIdAccountInputDto, IGetByIdAccountOutputDto>
{
  constructor(
    @Inject('IAccountGateway')
    private readonly accountGateway: IAccountGateway,
  ) {}

  async execute(
    input: IGetByIdAccountInputDto,
  ): Promise<IGetByIdAccountOutputDto> {
    const account = await this.accountGateway.getById(input.account_id);

    return {
      id: account.id,
      balance: account.balance,
      created_at: new Date(account.created_at),
      updated_at: new Date(account.updated_at),
    };
  }
}
