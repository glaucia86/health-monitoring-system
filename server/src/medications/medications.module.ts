import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';

@Module({
  controllers: [MedicationsController],
  providers: [MedicationsService],
})
export class MedicationsModule {}
