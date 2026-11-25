import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto, UpdateAttendanceDto } from './attendance-dto';
import { Message } from 'src/common/decorators/message.decorator';

@ApiTags('attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  @Message('Attendance Fetched Successfully')
  async getAttendance() {
    return await this.attendanceService.getAttendance();
  }

  @Post()
  @Message('Attendance Created Successfully')
  @ApiBody({ type: CreateAttendanceDto })
  async createAttendance(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.createAttendance(createAttendanceDto);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateAttendanceDto })
  async updateAttendance(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendanceService.updateAttendance(id, updateAttendanceDto);
  }
}
