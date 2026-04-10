import { Test, TestingModule } from '@nestjs/testing'
import { mockUser } from '@/test/mocks'
import { UsersRepository } from '@/modules/users/users.repository'
import { UsersService } from '@/modules/users/users.service'

jest.mock('@/modules/users/users.repository')

describe('UsersService', () => {
  let service: UsersService
  let mockRepository: jest.Mocked<UsersRepository>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useFactory: () => ({
            findAll: jest.fn()
          })
        }
      ]
    }).compile()

    service = module.get<UsersService>(UsersService)
    mockRepository = module.get(UsersRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      mockRepository.findAll.mockResolvedValue([mockUser, mockUser])

      const result = await service.findAll()

      expect(result).toEqual([mockUser, mockUser])
    })
  })
})
