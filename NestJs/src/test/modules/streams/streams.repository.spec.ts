import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { mockCreateMessageDto, mockMessage, mockUser } from '@/test/mocks'
import { Message } from '@/modules/streams/entities'
import { StreamsRepository } from '@/modules/streams/streams.repository'

describe('StreamsRepository', () => {
  let repository: StreamsRepository
  let mockTypeOrmRepository: Repository<Message>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StreamsRepository,
        {
          provide: getRepositoryToken(Message),
          useFactory: () => ({
            create: jest.fn(),
            createQueryBuilder: jest.fn(),
            save: jest.fn()
          })
        }
      ]
    }).compile()

    repository = module.get<StreamsRepository>(StreamsRepository)
    mockTypeOrmRepository = module.get<Repository<Message>>(
      getRepositoryToken(Message)
    )
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  it('should be defined', () => {
    expect(mockTypeOrmRepository).toBeDefined()
  })

  describe('create', () => {
    it('should create a message', async () => {
      jest.spyOn(mockTypeOrmRepository, 'create').mockReturnValue(mockMessage)
      jest.spyOn(mockTypeOrmRepository, 'save').mockResolvedValue(mockMessage)

      const result = await repository.create(mockCreateMessageDto, mockUser)

      expect(result).toEqual(mockMessage)
      expect(mockTypeOrmRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          user: mockUser
        })
      )
    })
  })

  describe('findAll', () => {
    it('should return an array of messages', async () => {
      const where = jest.fn().mockReturnThis()
      const orderBy = jest.fn().mockReturnThis()
      const getMany = jest.fn().mockResolvedValue([mockMessage, mockMessage])

      jest.spyOn(mockTypeOrmRepository, 'createQueryBuilder').mockReturnValue({
        where,
        orderBy,
        getMany
      } as any)

      const result = await repository.findAll(mockUser)

      expect(result).toEqual([mockMessage, mockMessage])
      expect(where).toHaveBeenCalledWith({ user: mockUser })
      expect(orderBy).toHaveBeenCalledWith('message.createdAt', 'ASC')
    })
  })
})
