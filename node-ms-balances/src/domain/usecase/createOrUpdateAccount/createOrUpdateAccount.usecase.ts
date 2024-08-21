import { Inject, Injectable } from '@nestjs/common';
import type { IUseCase } from '../usecase.interface';
import type { IAccountGateway } from 'src/domain/gateway/account.gateway';

export interface ICreateOrUpdateAccountInputDto {
  id: string;
  balance: number;
}

export interface ICreateOrUpdateAccountOutputDto {
  id: string;
  balance: number;
  created_at: Date;
  updated_at: Date;
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
    throw new Error('Method not implemented.');
  }
}
