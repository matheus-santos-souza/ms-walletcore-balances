import { Test, TestingModule } from '@nestjs/testing';
import { IAccountGateway } from 'src/domain/gateway/account.gateway';
import { CreateOrUpdateAccountUseCase } from './createOrUpdateAccount.usecase';

describe('CreateOrUpdateAccountUseCase', () => {
  let useCase: CreateOrUpdateAccountUseCase;
  let accountGateway: IAccountGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrUpdateAccountUseCase,
        {
          provide: 'IAccountGateway',
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateOrUpdateAccountUseCase>(
      CreateOrUpdateAccountUseCase,
    );
    accountGateway = module.get<IAccountGateway>('IAccountGateway');
  });

  it('should create or update an account successfully', async () => {
    const inputDto = {
      id: '123',
      balance: 1000,
    };

    const expectedOutput = {
      id: '123',
      balance: 1000,
    };

    await expect(useCase.execute(inputDto)).resolves.toEqual(expectedOutput);

    expect(accountGateway.save).toHaveBeenCalledTimes(1);
    expect(accountGateway.save).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: '123',
        _balance: 1000,
      }),
    );
  });

  it('should throw an error if save fails', async () => {
    const inputDto = {
      id: '123',
      balance: 1000,
    };

    (accountGateway.save as jest.Mock).mockRejectedValueOnce(
      new Error('Save failed'),
    );

    await expect(useCase.execute(inputDto)).rejects.toThrow('Save failed');
  });
});
