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
import { Permission } from 'src/auth/permissions.decorator';
import { User } from 'src/auth/user.decorator';
import type { AccessUser } from 'src/auth/access.service';

@ApiTags('meetings')
@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Get()
  @Permission('meetings:read:all', 'meetings:read:own')
  @Message('Meetings Fetched Successfully')
  async getMeetings(@User() user: AccessUser) {
    return await this.meetingsService.getMeetings(user);
  }

  @Get(':id')
  @Permission('meetings:read:all', 'meetings:read:own')
  @Message('Meeting Fetched Successfully')
  async getMeeting(@Param('id', ParseIntPipe) id: number, @User() user: AccessUser) {
    return await this.meetingsService.getMeeting(id, user);
  }

  @Post()
  @Permission('meetings:write')
  @Message('Meeting Created Successfully')
  @ApiBody({ type: CreateMeetingDto })
  async createMeeting(@Body() createMeetingDto: CreateMeetingDto, @User() user: AccessUser) {
    return await this.meetingsService.createMeeting(createMeetingDto, user);
  }

  @Patch(':id')
  @Permission('meetings:write')
  @Message('Meeting Updated Successfully')
  @ApiBody({ type: UpdateMeetingDto })
  async updateMeeting(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMeetingDto: UpdateMeetingDto,
    @User() user: AccessUser,
  ) {
    return await this.meetingsService.updateMeeting(id, updateMeetingDto, user);
  }
}
