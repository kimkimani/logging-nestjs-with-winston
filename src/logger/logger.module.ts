import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';

@Module({
  providers: [LoggerService], // Ensure LoggerService is provided
  exports: [LoggerService], controllers: [LoggerController],
})
export class LoggerModule {}
