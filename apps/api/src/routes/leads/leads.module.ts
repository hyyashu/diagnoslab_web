import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { WebsiteTapsService } from './website-taps.service';

@Module({
  controllers: [LeadsController],
  providers: [LeadsService, WebsiteTapsService],
})
export class LeadsModule {}
