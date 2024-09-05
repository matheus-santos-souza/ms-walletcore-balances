import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateOrUpdateAccountUseCase } from 'src/domain/usecase/createOrUpdateAccount/createOrUpdateAccount.usecase';

export interface IPayload {
  account_id_from: string;
  account_id_to: string;
  balance_account_id_from: number;
  balance_account_id_to: number;
}

export interface IMessage {
  Name: 'BalanceUpdated';
  Payload: IPayload;
}

@Controller()
export class KafkaConsumerController {
  constructor(
    private createOrUpdateAccountUseCase: CreateOrUpdateAccountUseCase,
  ) {}

  @EventPattern('balances')
  async handleTopicMessage(@Payload() message: IMessage) {
    try {
      await Promise.all([
        this.createOrUpdateAccountUseCase.execute({
          id: message.Payload.account_id_from,
          balance: message.Payload.balance_account_id_from,
        }),
        this.createOrUpdateAccountUseCase.execute({
          id: message.Payload.account_id_to,
          balance: message.Payload.balance_account_id_to,
        }),
      ]);
    } catch (error) {
      throw error;
    }
  }
}
