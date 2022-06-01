import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CoursesService } from 'src/courses/courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll(): Array<Course> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }): Course {
    return this.coursesService.findOne(id);
  }

  @Post()
  create(@Body() createCourseDTO: CreateCourseDto): Course {
    return this.coursesService.create(createCourseDTO);
  }

  @Patch(':id')
  update(
    @Body() updateCourseDTO: UpdateCourseDto,
    @Param() params,
  ): Course | string {
    return this.coursesService.update(params.id, updateCourseDTO);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() params): void {
    return this.coursesService.delete(params.id);
  }
}
