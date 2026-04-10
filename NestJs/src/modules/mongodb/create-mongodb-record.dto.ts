import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateMongoDbRecordDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  message!: string

  @IsOptional()
  @IsString()
  @MaxLength(80)
  source?: string
}
