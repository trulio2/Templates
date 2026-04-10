import { Controller, Get, Logger } from '@nestjs/common'
import { HealthService } from './health.service'

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name)

  constructor(private readonly healthService: HealthService) {}

  @Get()
  checkHealth() {
    this.logger.verbose('Health check requested')

    return this.healthService.checkHealth()
  }
}
