import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../../auth/entities'

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  content!: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @ManyToOne(() => User, (user) => user.messages)
  user!: User
}
