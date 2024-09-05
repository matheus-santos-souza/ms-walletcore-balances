import { Test, TestingModule } from '@nestjs/testing';
import {
  GetByIdAccountUseCase,
  IGetByIdAccountOutputDto,
} from 'src/domain/usecase/getByIdAccount/getByIdAccount.usecase';
import { IAccountGateway } from 'src/domain/gateway/account.gateway';

describe('GetByIdAccountUseCase', () => {
  let useCase: GetByIdAccountUseCase;
  let accountGateway: IAccountGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetByIdAccountUseCase,
        {
          provide: 'IAccountGateway',
          useValue: {
            getById: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetByIdAccountUseCase>(GetByIdAccountUseCase);
    accountGateway = module.get<IAccountGateway>('IAccountGateway');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return account data with correct format', async () => {
      const mockAccountId = '123';
      const mockAccount = {
        id: mockAccountId,
        balance: 1000,
        created_at: Date.now(), // Timestamps como milissegundos
        updated_at: Date.now(),
      };

      // Simula a resposta do método getById
      (accountGateway.getById as jest.Mock).mockResolvedValue(mockAccount);

      const result: IGetByIdAccountOutputDto = await useCase.execute({
        account_id: mockAccountId,
      });

      // Verifica a resposta
      expect(result).toEqual({
        id: mockAccountId,
        balance: 1000,
        created_at: new Date(mockAccount.created_at),
        updated_at: new Date(mockAccount.updated_at),
      });

      // Verifica que o método getById foi chamado com o ID correto
      expect(accountGateway.getById).toHaveBeenCalledWith(mockAccountId);
      expect(accountGateway.getById).toHaveBeenCalledTimes(1);
    });
  });
});
