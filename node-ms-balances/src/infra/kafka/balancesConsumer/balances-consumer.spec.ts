import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrUpdateAccountUseCase } from 'src/domain/usecase/createOrUpdateAccount/createOrUpdateAccount.usecase';
import { IMessage, KafkaConsumerController } from './balances.consumer';

type MockCreateOrUpdateAccountUseCase = {
  execute: jest.Mock;
};

describe('KafkaConsumerController', () => {
  let kafkaConsumerController: KafkaConsumerController;
  let createOrUpdateAccountUseCase: MockCreateOrUpdateAccountUseCase;

  beforeEach(async () => {
    createOrUpdateAccountUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [KafkaConsumerController],
      providers: [
        {
          provide: CreateOrUpdateAccountUseCase,
          useValue: createOrUpdateAccountUseCase,
        },
      ],
    }).compile();

    kafkaConsumerController = module.get<KafkaConsumerController>(
      KafkaConsumerController,
    );
  });

  describe('handleTopicMessage', () => {
    it('should process the message and call execute for both accounts', async () => {
      const message = {
        Name: 'BalanceUpdated' as const,
        Payload: {
          account_id_from: '1',
          account_id_to: '2',
          balance_account_id_from: 1000,
          balance_account_id_to: 2000,
        },
      } as IMessage;

      await kafkaConsumerController.handleTopicMessage(message);

      expect(createOrUpdateAccountUseCase.execute).toHaveBeenCalledWith({
        id: '1',
        balance: 1000,
      });
      expect(createOrUpdateAccountUseCase.execute).toHaveBeenCalledWith({
        id: '2',
        balance: 2000,
      });
      expect(createOrUpdateAccountUseCase.execute).toHaveBeenCalledTimes(2);
    });

    it('should handle errors thrown by execute', async () => {
      const message = {
        Name: 'BalanceUpdated' as const,
        Payload: {
          account_id_from: '1',
          account_id_to: '2',
          balance_account_id_from: 1000,
          balance_account_id_to: 2000,
        },
      } as IMessage;

      createOrUpdateAccountUseCase.execute.mockRejectedValue(
        new Error('Test error'),
      );

      await expect(
        kafkaConsumerController.handleTopicMessage(message),
      ).rejects.toThrow('Test error');
    });
  });
});
