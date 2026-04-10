import { Test, TestingModule } from '@nestjs/testing'
import { Socket } from 'socket.io'
import { mockMessage, mockUser } from '@/test/mocks'
import { StreamsRepository } from '@/modules/streams/streams.repository'
import { StreamsService } from '@/modules/streams/streams.service'

jest.mock('@/modules/streams/streams.repository')

describe('StreamsService', () => {
  let service: StreamsService
  let mockRepository: jest.Mocked<StreamsRepository>
  let mockClient: jest.Mocked<Socket>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StreamsService,
        {
          provide: StreamsRepository,
          useFactory: () => ({
            create: jest.fn(),
            findAll: jest.fn()
          })
        },
        {
          provide: Socket,
          useFactory: () => ({
            emit: jest.fn(),
            disconnect: jest.fn()
          })
        }
      ]
    }).compile()

    service = module.get<StreamsService>(StreamsService)
    mockRepository = module.get(StreamsRepository)
    mockClient = module.get(Socket)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll', () => {
    it('should return an array of messages', async () => {
      mockRepository.findAll.mockResolvedValue([mockMessage, mockMessage])

      const result = await service.findAll(mockUser)

      expect(result).toEqual([mockMessage, mockMessage])
    })
  })
})
