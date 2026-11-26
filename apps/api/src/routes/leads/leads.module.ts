import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { WebsiteTapsService } from './website-taps.service';
import { AdsUploadService } from './ads-upload.service';

@Module({
  controllers: [LeadsController],
  providers: [LeadsService, WebsiteTapsService, AdsUploadService],
})
export class LeadsModule {}
