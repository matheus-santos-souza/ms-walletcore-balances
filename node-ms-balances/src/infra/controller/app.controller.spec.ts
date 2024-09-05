import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import {
  GetByIdAccountUseCase,
  IGetByIdAccountOutputDto,
} from 'src/domain/usecase/getByIdAccount/getByIdAccount.usecase';

describe('AppController', () => {
  let appController: AppController;
  let getByIdAccountUseCase: GetByIdAccountUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: GetByIdAccountUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    getByIdAccountUseCase = module.get<GetByIdAccountUseCase>(
      GetByIdAccountUseCase,
    );
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getHello', () => {
    it('should return the expected output from the use case', async () => {
      const mockAccountId = '123';
      const mockOutput: IGetByIdAccountOutputDto = {
        id: mockAccountId,
        balance: 1000,
        created_at: new Date(),
        updated_at: new Date(),
      };

      (getByIdAccountUseCase.execute as jest.Mock).mockResolvedValue(
        mockOutput,
      );

      const result = await appController.getHello(mockAccountId);
      expect(result).toEqual(mockOutput);
      expect(getByIdAccountUseCase.execute).toHaveBeenCalledWith({
        account_id: mockAccountId,
      });
      expect(getByIdAccountUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });
});
