import { Module } from '@nestjs/common';
import { IntakesService } from './intakes.service';
import { IntakesController } from './intakes.controller';

@Module({
  controllers: [IntakesController],
  providers: [IntakesService],
})
export class IntakesModule {}
