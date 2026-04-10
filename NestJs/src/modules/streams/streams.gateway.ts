import { UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { GetUserWs } from '@/decorators'
import { WsGuard } from '@/guards'
import { User } from '@/modules/auth/entities'
import { StreamMessageDto } from './dtos'
import { Message } from './entities'
import { WsAndHttpExceptionFilter } from './streams.filter'
import { StreamsService } from './streams.service'

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
@UsePipes(new ValidationPipe({ whitelist: true }))
@UseGuards(WsGuard)
export class StreamsGateway {
  constructor(private readonly streamsService: StreamsService) {}

  @SubscribeMessage('findAll')
  @UseFilters(WsAndHttpExceptionFilter)
  async findAll(@GetUserWs() user: User): Promise<Message[]> {
    const messages = await this.streamsService.findAll(user)
    return messages
  }

  @SubscribeMessage('stream')
  @UseFilters(WsAndHttpExceptionFilter)
  handleStream(@ConnectedSocket() client: Socket): void {
    this.streamsService.stream(client)
  }
}
