import { Module } from '@nestjs/common';
import { AppController } from './infra/controller/app.controller';
import { AccountRepository } from './infra/repository/account/account.repository';
import { CreateOrUpdateAccountUseCase } from './domain/usecase/createOrUpdateAccount/createOrUpdateAccount.usecase';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    { provide: 'IAccountGateway', useClass: AccountRepository },
    CreateOrUpdateAccountUseCase,
  ],
  exports: ['IAccountGateway'],
})
export class AppModule {}
