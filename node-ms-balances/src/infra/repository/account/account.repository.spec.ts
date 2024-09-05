import { Test, TestingModule } from '@nestjs/testing';
import { AccountRepository } from './account.repository';
import { PrismaService } from '../prisma/prisma.service';
import { Account } from 'src/domain/entity/account.entity';

// Crie um tipo para o mock do PrismaService
type MockPrismaService = {
  account: {
    upsert: jest.Mock;
    findUnique: jest.Mock;
  };
};

describe('AccountRepository', () => {
  let accountRepository: AccountRepository;
  let prismaService: MockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountRepository,
        {
          provide: PrismaService,
          useValue: {
            account: {
              upsert: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    accountRepository = module.get<AccountRepository>(AccountRepository);
    prismaService = module.get<PrismaService>(
      PrismaService,
    ) as unknown as MockPrismaService;
  });

  describe('save', () => {
    it('should call prismaClient.account.upsert with correct parameters', async () => {
      const account = new Account({
        id: '1',
        balance: 1000,
        created_at: Date.now(),
        updated_at: Date.now(),
      });

      await accountRepository.save(account);

      expect(prismaService.account.upsert).toHaveBeenCalledWith({
        create: {
          id: account.id,
          balance: account.balance,
          created_at: account.created_at,
          updated_at: expect.any(Number),
        },
        update: {
          balance: account.balance,
          updated_at: expect.any(Number),
        },
        where: {
          id: account.id,
        },
      });
    });
  });

  describe('getById', () => {
    it('should return an account when it exists', async () => {
      const account = {
        id: '1',
        balance: '1000',
        created_at: '1666666666666',
        updated_at: '1666666666666',
      };

      (prismaService.account.findUnique as jest.Mock).mockResolvedValue(
        account,
      );

      const result = await accountRepository.getById('1');

      expect(result).toBeInstanceOf(Account);
      expect(result.id).toEqual(account.id);
      expect(result.balance).toEqual(Number(account.balance));
      expect(result.created_at).toEqual(Number(account.created_at));
      expect(result.updated_at).toEqual(Number(account.updated_at));
    });

    it('should throw an error when the account does not exist', async () => {
      (prismaService.account.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(accountRepository.getById('1')).rejects.toThrow(
        'Account not exists!',
      );
    });
  });
});
