import { Test, TestingModule } from '@nestjs/testing'
import { Socket } from 'socket.io'
import { mockMessage, mockUser } from '@/test/mocks'
import { StreamsGateway } from '@/modules/streams/streams.gateway'
import { StreamsService } from '@/modules/streams/streams.service'

jest.mock('@/modules/streams/streams.service')

describe('StreamsGateway', () => {
  let gateWay: StreamsGateway
  let mockService: jest.Mocked<StreamsService>
  let mockClient: jest.Mocked<Socket>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StreamsGateway,
        {
          provide: StreamsService,
          useFactory: () => ({
            findAll: jest.fn(),
            stream: jest.fn()
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

    gateWay = module.get<StreamsGateway>(StreamsGateway)
    mockService = module.get(StreamsService)
    mockClient = module.get(Socket)
  })

  it('should be defined', () => {
    expect(gateWay).toBeDefined()
  })

  describe('findAll', () => {
    it('should return an array of messages', async () => {
      mockService.findAll.mockResolvedValue([mockMessage, mockMessage])

      expect(await gateWay.findAll(mockUser)).toEqual([
        mockMessage,
        mockMessage
      ])
      expect(mockService.findAll).toHaveBeenCalledWith(mockUser)
    })
  })

  describe('stream', () => {
    it('should call stream', () => {
      gateWay.handleStream(mockClient)

      expect(mockService.stream).toHaveBeenCalledWith(mockClient)
    })
  })
})
