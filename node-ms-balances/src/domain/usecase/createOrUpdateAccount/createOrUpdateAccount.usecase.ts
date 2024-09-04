import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../usecase.interface';
import { IAccountGateway } from 'src/domain/gateway/account.gateway';
import { Account } from 'src/domain/entity/account.entity';

export interface ICreateOrUpdateAccountInputDto {
  id: string;
  balance: number;
}

export interface ICreateOrUpdateAccountOutputDto {
  id: string;
  balance: number;
}

@Injectable()
export class CreateOrUpdateAccountUseCase
  implements
    IUseCase<ICreateOrUpdateAccountInputDto, ICreateOrUpdateAccountOutputDto>
{
  constructor(
    @Inject('IAccountGateway')
    private readonly accountGateway: IAccountGateway,
  ) {}

  async execute(
    input: ICreateOrUpdateAccountInputDto,
  ): Promise<ICreateOrUpdateAccountOutputDto> {
    await this.accountGateway.save(
      new Account({
        id: input.id,
        balance: input.balance,
      }),
    );

    return {
      id: input.id,
      balance: input.balance,
    };
  }
}
