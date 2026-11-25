import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LeadsService } from './leads.service';
import { BookLeadDto, CreateLeadDto, CreateTaskDto, LogActivityDto, UpdateLeadDto, UpdateTaskDto } from './lead-dto';
import { Message } from '../../common/decorators/message.decorator';
import { Public } from 'src/auth/public.decorator';
import { Permission } from 'src/auth/permissions.decorator';
import { User } from 'src/auth/user.decorator';
import type { AccessUser } from 'src/auth/access.service';

/* Who sees which lead is decided in LeadsService (all, or only assigned). */
@ApiTags('leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  @Permission('leads:read:all', 'leads:read:own')
  @Message('Leads Fetched Successfully')
  getLeads(@User() user: AccessUser) {
    return this.leadsService.getLeads(user);
  }

  /* Static routes before `:id`. */
  @Get('owners')
  @Permission('leads:read:all', 'leads:read:own')
  @Message('Owners Fetched Successfully')
  owners() {
    return this.leadsService.owners();
  }

  @Get('tasks/open')
  @Permission('leads:read:all', 'leads:read:own')
  @Message('Tasks Fetched Successfully')
  openTasks(@User() user: AccessUser) {
    return this.leadsService.openTasks(user);
  }

  @Patch('tasks/:taskId')
  @Permission('leads:work')
  @Message('Task Updated Successfully')
  @ApiBody({ type: UpdateTaskDto })
  updateTask(@Param('taskId', ParseIntPipe) taskId: number, @Body() dto: UpdateTaskDto, @User() user: AccessUser) {
    return this.leadsService.updateTask(taskId, dto, user);
  }

  @Get(':id')
  @Permission('leads:read:all', 'leads:read:own')
  @Message('Lead Fetched Successfully')
  getLead(@Param('id', ParseIntPipe) id: number, @User() user: AccessUser) {
    return this.leadsService.getLead(id, user);
  }

  /* The only public lead route: the website's enquiry forms post here. */
  @Public()
  @Post()
  @Message('Lead Created Successfully')
  @ApiBody({ type: CreateLeadDto })
  createLead(@Body() dto: CreateLeadDto) {
    return this.leadsService.createLead(dto);
  }

  @Patch(':id')
  @Permission('leads:work')
  @Message('Lead Updated Successfully')
  @ApiBody({ type: UpdateLeadDto })
  updateLead(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLeadDto, @User() user: AccessUser) {
    return this.leadsService.updateLead(id, dto, user);
  }

  @Post(':id/activities')
  @Permission('leads:work')
  @Message('Activity Logged')
  @ApiBody({ type: LogActivityDto })
  logActivity(@Param('id', ParseIntPipe) id: number, @Body() dto: LogActivityDto, @User() user: AccessUser) {
    return this.leadsService.logActivity(id, dto, user);
  }

  @Post(':id/book')
  @Permission('leads:work')
  @Message('Lead Booked')
  @ApiBody({ type: BookLeadDto })
  book(@Param('id', ParseIntPipe) id: number, @Body() dto: BookLeadDto, @User() user: AccessUser) {
    return this.leadsService.book(id, dto, user);
  }

  @Post(':id/tasks')
  @Permission('leads:work')
  @Message('Task Created')
  @ApiBody({ type: CreateTaskDto })
  createTask(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateTaskDto, @User() user: AccessUser) {
    return this.leadsService.createTask(id, dto, user);
  }
}
