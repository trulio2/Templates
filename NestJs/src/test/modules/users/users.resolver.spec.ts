import { Test, TestingModule } from '@nestjs/testing'
import { mockUser } from '@/test/mocks'
import { UsersResolver } from '@/modules/users/users.resolver'
import { UsersService } from '@/modules/users/users.service'

jest.mock('@/modules/users/users.service')

describe('UsersResolver', () => {
  let resolver: UsersResolver
  let mockService: jest.Mocked<UsersService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useFactory: () => ({
            findAll: jest.fn()
          })
        }
      ]
    }).compile()

    resolver = module.get<UsersResolver>(UsersResolver)
    mockService = module.get(UsersService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('findAllUsers', () => {
    it('should return an array of users', async () => {
      mockService.findAll.mockResolvedValue([mockUser, mockUser])

      const result = await resolver.findAllUsers(mockUser)

      expect(result).toEqual([mockUser, mockUser])
    })
  })
})
