import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import {
  mockCat,
  mockCreateCatDto,
  mockGetCatsFilterDto,
  mockUpdateCatDto,
  mockUser
} from '@/test/mocks'
import { CatsRepository } from '@/modules/cats/cats.repository'
import { CatsService } from '@/modules/cats/cats.service'
import { GetCatsFilterDto } from '@/modules/cats/dtos'

jest.mock('@/modules/cats/cats.repository')

describe('CatsService', () => {
  let service: CatsService
  let mockRepository: jest.Mocked<CatsRepository>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: CatsRepository,
          useFactory: () => ({
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
            update: jest.fn()
          })
        }
      ]
    }).compile()

    service = module.get<CatsService>(CatsService)
    mockRepository = module.get(CatsRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create a cat', async () => {
      mockRepository.create.mockResolvedValue(mockCat)

      const result = await service.create(mockCreateCatDto, mockUser)

      expect(result).toEqual(mockCat)
      expect(mockRepository.create).toHaveBeenCalledWith(
        mockCreateCatDto,
        mockUser
      )
    })
  })

  describe('findAll', () => {
    it('should find all cats', async () => {
      mockRepository.findAll.mockResolvedValue([mockCat, mockCat])

      const result = await service.findAll(mockGetCatsFilterDto, mockUser)

      expect(result).toEqual([mockCat, mockCat])
      expect(mockRepository.findAll).toHaveBeenCalledWith(
        mockGetCatsFilterDto,
        mockUser
      )
    })

    it('should find all cats without filter', async () => {
      mockRepository.findAll.mockResolvedValue([mockCat, mockCat])

      await expect(
        service.findAll(undefined as unknown as GetCatsFilterDto, mockUser)
      ).resolves.toEqual([mockCat, mockCat])
      expect(mockRepository.findAll).toHaveBeenCalledWith({}, mockUser)
    })
  })

  describe('findOne', () => {
    it('should find one cat by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockCat)

      const result = await service.findOne('uuid', mockUser)

      expect(result).toEqual(mockCat)
      expect(mockRepository.findOne).toHaveBeenCalledWith('uuid', mockUser)
    })

    it('should throw an error if cat is not found', async () => {
      await expect(service.findOne('uuid', mockUser)).rejects.toThrow(
        NotFoundException
      )
    })
  })

  describe('remove', () => {
    it('should remove a cat by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockCat)
      mockRepository.remove.mockResolvedValue(mockCat)

      const result = await service.remove('uuid', mockUser)

      expect(result).toEqual(mockCat)
      expect(mockRepository.findOne).toHaveBeenCalledWith('uuid', mockUser)
      expect(mockRepository.remove).toHaveBeenCalledWith(mockCat)
    })

    it('should throw an error if cat is not found', async () => {
      await expect(service.remove('uuid', mockUser)).rejects.toThrow(
        NotFoundException
      )
    })
  })

  describe('update', () => {
    it('should update a cat by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockCat)
      mockRepository.update.mockResolvedValue(mockCat)

      const result = await service.update('uuid', mockUpdateCatDto, mockUser)

      expect(result).toEqual(mockCat)
      expect(mockRepository.findOne).toHaveBeenCalledWith('uuid', mockUser)
      expect(mockRepository.update).toHaveBeenCalledWith(
        mockCat,
        mockUpdateCatDto
      )
    })

    it('should throw an error if cat is not found', async () => {
      await expect(
        service.update('uuid', mockUpdateCatDto, mockUser)
      ).rejects.toThrow(NotFoundException)
    })
  })
})
