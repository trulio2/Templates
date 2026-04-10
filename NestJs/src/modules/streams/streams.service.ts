import { Injectable } from '@nestjs/common'
import { Socket } from 'socket.io'
import { User } from '../auth/entities'
import { Message } from './entities'
import { StreamsRepository } from './streams.repository'

@Injectable()
export class StreamsService {
  constructor(private readonly streamsRepository: StreamsRepository) {}

  findAll(user: User): Promise<Message[]> {
    return this.streamsRepository.findAll(user)
  }

  async stream(client: Socket) {
    client.disconnect()
  }
}
