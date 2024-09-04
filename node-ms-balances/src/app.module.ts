import { Module } from '@nestjs/common';
import { AppController } from './infra/controller/app.controller';
import { AccountRepository } from './infra/repository/account/account.repository';
import { CreateOrUpdateAccountUseCase } from './domain/usecase/createOrUpdateAccount/createOrUpdateAccount.usecase';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GetByIdAccountUseCase } from './domain/usecase/getByIdAccount/getByIdAccount.usecase';
import { KafkaConsumerController } from './infra/kafka/balancesConsumer/balances.consumer';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:29092'],
          },
          consumer: {
            groupId: 'wallet',
          },
        },
      },
    ]),
  ],
  controllers: [AppController, KafkaConsumerController],
  providers: [
    { provide: 'IAccountGateway', useClass: AccountRepository },
    CreateOrUpdateAccountUseCase,
    GetByIdAccountUseCase,
  ],
  exports: ['IAccountGateway'],
})
export class AppModule {}
