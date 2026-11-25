import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LeadsService } from './leads.service';
import { BookLeadDto, CreateLeadDto, CreateTaskDto, LogActivityDto, UpdateLeadDto, UpdateTaskDto } from './lead-dto';
import { Message } from '../../common/decorators/message.decorator';
import { Public } from 'src/auth/public.decorator';
import { User } from 'src/auth/user.decorator';

@ApiTags('leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  @Message('Leads Fetched Successfully')
  getLeads() {
    return this.leadsService.getLeads();
  }

  /* Static routes before `:id`. */
  @Get('owners')
  @Message('Owners Fetched Successfully')
  owners() {
    return this.leadsService.owners();
  }

  @Get('tasks/open')
  @Message('Tasks Fetched Successfully')
  openTasks() {
    return this.leadsService.openTasks();
  }

  @Patch('tasks/:taskId')
  @Message('Task Updated Successfully')
  @ApiBody({ type: UpdateTaskDto })
  updateTask(@Param('taskId', ParseIntPipe) taskId: number, @Body() dto: UpdateTaskDto, @User('id') userId: number) {
    return this.leadsService.updateTask(taskId, dto, userId);
  }

  @Get(':id')
  @Message('Lead Fetched Successfully')
  getLead(@Param('id', ParseIntPipe) id: number) {
    return this.leadsService.getLead(id);
  }

  /* The only public lead route: the website's enquiry forms post here.
     A signed-in staff member (mobile app) is recorded on the timeline. */
  @Public()
  @Post()
  @Message('Lead Created Successfully')
  @ApiBody({ type: CreateLeadDto })
  createLead(@Body() dto: CreateLeadDto, @User('id') userId?: number) {
    return this.leadsService.createLead(dto, userId);
  }

  @Patch(':id')
  @Message('Lead Updated Successfully')
  @ApiBody({ type: UpdateLeadDto })
  updateLead(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLeadDto, @User('id') userId: number) {
    return this.leadsService.updateLead(id, dto, userId);
  }

  @Post(':id/activities')
  @Message('Activity Logged')
  @ApiBody({ type: LogActivityDto })
  logActivity(@Param('id', ParseIntPipe) id: number, @Body() dto: LogActivityDto, @User('id') userId: number) {
    return this.leadsService.logActivity(id, dto, userId);
  }

  @Post(':id/book')
  @Message('Lead Booked')
  @ApiBody({ type: BookLeadDto })
  book(@Param('id', ParseIntPipe) id: number, @Body() dto: BookLeadDto, @User('id') userId: number) {
    return this.leadsService.book(id, dto, userId);
  }

  @Post(':id/tasks')
  @Message('Task Created')
  @ApiBody({ type: CreateTaskDto })
  createTask(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateTaskDto, @User('id') userId: number) {
    return this.leadsService.createTask(id, dto, userId);
  }
}
