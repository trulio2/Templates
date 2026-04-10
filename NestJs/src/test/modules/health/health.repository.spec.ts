import { Test, TestingModule } from '@nestjs/testing'
import { getConnectionToken } from '@nestjs/mongoose'
import { HealthRepository } from '@/modules/health/health.repository'

describe('HealthRepository', () => {
  let repository: HealthRepository
  let mockConnection: {
    db?: {
      admin: () => {
        command: jest.Mock
      }
    }
    name: string
    readyState: number
  }

  beforeEach(async () => {
    mockConnection = {
      db: {
        admin: () => ({
          command: jest.fn().mockResolvedValue({ ok: 1 })
        })
      },
      name: 'nest-mongo',
      readyState: 0
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthRepository,
        {
          provide: getConnectionToken(),
          useValue: mockConnection
        }
      ]
    }).compile()

    repository = module.get<HealthRepository>(HealthRepository)
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  it('should report mongodb up when ping succeeds', async () => {
    const result = await repository.checkMongoDb()

    expect(result).toEqual({
      database: 'nest-mongo',
      readyState: 0,
      status: 'up'
    })
  })

  it('should report mongodb down when db is missing', async () => {
    mockConnection.db = undefined

    const result = await repository.checkMongoDb()

    expect(result).toEqual({
      database: 'nest-mongo',
      readyState: 0,
      status: 'down'
    })
  })
})
