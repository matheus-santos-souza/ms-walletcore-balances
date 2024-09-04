import { Controller, Get, Param } from '@nestjs/common';
import {
  GetByIdAccountUseCase,
  IGetByIdAccountOutputDto,
} from 'src/domain/usecase/getByIdAccount/getByIdAccount.usecase';

@Controller('balances')
export class AppController {
  constructor(private getByIdAccountUseCase: GetByIdAccountUseCase) {}

  @Get(':id')
  async getHello(
    @Param('id') account_id: string,
  ): Promise<IGetByIdAccountOutputDto> {
    return await this.getByIdAccountUseCase.execute({ account_id });
  }
}
