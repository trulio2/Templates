import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { mockCreateUserDto, mockSignInDto, mockUser } from '@/test/mocks'
import { AuthRepository } from '@/modules/auth/auth.repository'
import { User } from '@/modules/auth/entities'
import { HashService } from '@/modules/auth/hash'

jest.mock('@/modules/auth/hash/hash.service')

describe('AuthRepository', () => {
  let repository: AuthRepository
  let mockHashService: jest.Mocked<HashService>
  let mockTypeOrmRepository: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthRepository,
        {
          provide: HashService,
          useFactory: () => ({
            compare: jest.fn(),
            hash: jest.fn()
          })
        },
        {
          provide: getRepositoryToken(User),
          useFactory: () => ({
            create: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn()
          })
        }
      ]
    }).compile()

    repository = module.get<AuthRepository>(AuthRepository)
    mockHashService = module.get(HashService)
    mockTypeOrmRepository = module.get<Repository<User>>(
      getRepositoryToken(User)
    )
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  it('should be defined', () => {
    expect(mockTypeOrmRepository).toBeDefined()
  })

  describe('signIn', () => {
    it('should return a user', async () => {
      jest.spyOn(mockTypeOrmRepository, 'findOneBy').mockResolvedValue(mockUser)
      mockHashService.compare.mockResolvedValue(true)

      const result = await repository.signIn(mockSignInDto)

      expect(result).toEqual(mockUser)
      expect(mockTypeOrmRepository.findOneBy).toHaveBeenCalledWith({
        username: mockSignInDto.username
      })
      expect(mockHashService.compare).toHaveBeenCalledWith(
        mockSignInDto.password,
        mockUser.password
      )
    })

    it('should return null for user not found', async () => {
      const result = await repository.signIn(mockSignInDto)

      expect(result).toEqual(null)
      expect(mockTypeOrmRepository.findOneBy).toHaveBeenCalledWith({
        username: mockSignInDto.username
      })
      expect(mockHashService.compare).not.toHaveBeenCalled()
    })

    it('should return null for incorrect password', async () => {
      jest.spyOn(mockTypeOrmRepository, 'findOneBy').mockResolvedValue(mockUser)
      mockHashService.compare.mockResolvedValue(false)

      const result = await repository.signIn(mockSignInDto)

      expect(result).toEqual(null)
      expect(mockTypeOrmRepository.findOneBy).toHaveBeenCalledWith({
        username: mockSignInDto.username
      })
      expect(mockHashService.compare).toHaveBeenCalledWith(
        mockSignInDto.password,
        mockUser.password
      )
    })
  })

  describe('signUp', () => {
    it('should return a user', async () => {
      jest.spyOn(mockHashService, 'hash').mockResolvedValue('hashed-password')
      jest.spyOn(mockTypeOrmRepository, 'create').mockReturnValue(mockUser)
      jest.spyOn(mockTypeOrmRepository, 'save').mockResolvedValue(mockUser)

      const result = await repository.signUp(mockCreateUserDto)

      expect(result).toEqual(mockUser)
      expect(mockHashService.hash).toHaveBeenCalledWith(
        mockCreateUserDto.password
      )
      expect(mockTypeOrmRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          password: 'hashed-password'
        })
      )
    })
  })
})
