import { UnauthorizedException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { mockCreateUserDto, mockSignInDto, mockToken } from '@/test/mocks'
import { AuthController } from '@/modules/auth/auth.controller'
import { AuthService } from '@/modules/auth/auth.service'

jest.mock('@/modules/auth/auth.service')

describe('AuthController', () => {
  let controller: AuthController
  let mockService: jest.Mocked<AuthService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthController,
        {
          provide: AuthService,
          useFactory: () => ({
            signIn: jest.fn(),
            signUp: jest.fn()
          })
        }
      ]
    }).compile()

    controller = module.get<AuthController>(AuthController)
    mockService = module.get(AuthService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('signIn', () => {
    it('should return the access token', async () => {
      mockService.signIn.mockResolvedValue(mockToken)

      const result = await controller.signIn(mockSignInDto)

      expect(result).toEqual(mockToken)
      expect(mockService.signIn).toHaveBeenCalledWith(mockSignInDto)
    })

    it('should throw an UnauthorizedException', async () => {
      mockService.signIn.mockRejectedValue(new UnauthorizedException())

      await expect(controller.signIn(mockSignInDto)).rejects.toThrow(
        UnauthorizedException
      )
    })
  })

  describe('signUp', () => {
    it('should return the access token', async () => {
      mockService.signUp.mockResolvedValue(mockToken)

      const result = await controller.signUp(mockCreateUserDto)

      expect(result).toEqual(mockToken)
      expect(mockService.signUp).toHaveBeenCalledWith(mockCreateUserDto)
    })

    it('should throw an error', async () => {
      mockService.signUp.mockRejectedValue(new Error())

      await expect(controller.signUp(mockCreateUserDto)).rejects.toThrow(Error)
    })
  })
})
