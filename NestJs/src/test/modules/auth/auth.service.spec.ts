import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { mockCreateUserDto, mockSignInDto, mockUser } from '@/test/mocks'
import { AuthRepository } from '@/modules/auth/auth.repository'
import { AuthService } from '@/modules/auth/auth.service'

jest.mock('@/modules/auth/auth.repository')

describe('AuthService', () => {
  let service: AuthService
  let mockRepository: jest.Mocked<AuthRepository>
  let mockJwtService: jest.Mocked<JwtService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useFactory: () => ({
            sign: jest.fn()
          })
        },
        {
          provide: AuthRepository,
          useFactory: () => ({
            signIn: jest.fn(),
            signUp: jest.fn()
          })
        }
      ]
    }).compile()

    service = module.get<AuthService>(AuthService)
    mockRepository = module.get(AuthRepository)
    mockJwtService = module.get(JwtService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be defined', () => {
    expect(mockJwtService).toBeDefined()
  })

  describe('signIn', () => {
    it('should return a user', async () => {
      mockRepository.signIn.mockResolvedValue(mockUser)
      mockJwtService.sign.mockReturnValue('token')

      const result = await service.signIn(mockSignInDto)

      expect(result).toEqual({ accessToken: 'token' })
      expect(mockRepository.signIn).toHaveBeenCalledWith(mockSignInDto)
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        username: mockUser.username
      })
    })

    it('should throw an error', async () => {
      mockRepository.signIn.mockResolvedValue(null)

      await expect(service.signIn(mockSignInDto)).rejects.toThrow(
        UnauthorizedException
      )

      expect(mockRepository.signIn).toHaveBeenCalledWith(mockSignInDto)
      expect(mockJwtService.sign).not.toHaveBeenCalled()
    })
  })

  describe('signUp', () => {
    it('should return a user', async () => {
      mockRepository.signUp.mockResolvedValue(mockUser)
      mockJwtService.sign.mockReturnValue('token')

      const result = await service.signUp(mockCreateUserDto)

      expect(result).toEqual({ accessToken: 'token' })
      expect(mockRepository.signUp).toHaveBeenCalledWith(mockCreateUserDto)
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        username: mockUser.username
      })
    })

    it('should throw an error', async () => {
      mockRepository.signUp.mockRejectedValue({ code: '23505' })

      await expect(service.signUp(mockCreateUserDto)).rejects.toThrow(
        ConflictException
      )
    })

    it('should throw an error', async () => {
      mockRepository.signUp.mockRejectedValue({ code: '12345' })

      await expect(service.signUp(mockCreateUserDto)).rejects.toThrow(
        InternalServerErrorException
      )
    })
  })
})
