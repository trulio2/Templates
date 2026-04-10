import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '@/modules/auth/entities'

@Entity()
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  age!: number

  @ManyToOne(() => User, (user) => user.cats)
  user!: User
}
