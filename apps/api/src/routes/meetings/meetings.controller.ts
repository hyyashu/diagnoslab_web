import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { MeetingsService } from './meetings.service';
import { Message } from 'src/common/decorators/message.decorator';
import { CreateMeetingDto, UpdateMeetingDto } from './meeting-dto';

@ApiTags('meetings')
@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Get()
  @Message('Meetings Fetched Successfully')
  async getMeetings() {
    return await this.meetingsService.getMeetings();
  }

  @Get(':id')
  @Message('Meeting Fetched Successfully')
  async getMeeting(@Param('id', ParseIntPipe) id: number) {
    return await this.meetingsService.getMeeting(id);
  }

  @Post()
  @Message('Meeting Created Successfully')
  @ApiBody({ type: CreateMeetingDto })
  async createMeeting(@Body() createMeetingDto: CreateMeetingDto) {
    return await this.meetingsService.createMeeting(createMeetingDto);
  }

  @Patch(':id')
  @Message('Meeting Updated Successfully')
  @ApiBody({ type: UpdateMeetingDto })
  async updateMeeting(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMeetingDto: UpdateMeetingDto,
  ) {
    return await this.meetingsService.updateMeeting(id, updateMeetingDto);
  }
}
