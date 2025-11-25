import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';

@Module({
  controllers: [ExamsController],
  providers: [ExamsService],
})
export class ExamsModule {}
