import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Fundamentos de Javascript',
      description: 'Fundamentos de Javascript do zero ao avançado!',
      price: 30.0,
      tags: ['Javascript', 'Frontend'],
    },
  ];

  findAll(): Array<Course> {
    return this.courses;
  }

  findOne(id: string): Course {
    const course = this.courses.find((course) => course.id === Number(id));

    if (!course) {
      throw new HttpException('Curso não encontrado', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  create(createCourseDTO: CreateCourseDto): Course {
    const { name, description, price, tags } = createCourseDTO;

    if (!name || !description || !price || !tags) {
      throw new HttpException(
        'Preencha todos os campos!',
        HttpStatus.BAD_REQUEST,
      );
    }

    let course = new Course();

    course = { id: new Date().getTime(), ...createCourseDTO };

    this.courses.push(course);

    return course;
  }

  update(id: string, updateCourseDTO: UpdateCourseDto): Course | string {
    console.log(id);
    const indexCourse = this.courses.findIndex(
      (course) => course.id === Number(id),
    );

    if (indexCourse < 0)
      throw new HttpException('Curso não encontrado', HttpStatus.NOT_FOUND);

    this.courses[indexCourse] = {
      ...this.courses[indexCourse],
      ...updateCourseDTO,
    };

    return this.courses[indexCourse];
  }

  delete(id: string): void {
    const indexCourse = this.courses.findIndex(
      (course) => course.id === Number(id),
    );

    if (!indexCourse) {
      throw new HttpException('Curso não encontrado', HttpStatus.NOT_FOUND);
    }

    this.courses.splice(indexCourse, 1);
  }
}
