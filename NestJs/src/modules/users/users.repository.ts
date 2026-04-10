import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@/modules/auth/entities'

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    const query = this.repository.createQueryBuilder('user')

    query.leftJoinAndSelect('user.cats', 'cat')

    return await query.getMany()
  }
}
