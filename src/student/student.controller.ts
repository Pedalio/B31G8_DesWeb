import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateStudentDTO } from './dto/create_student.dto';
import { StudentService } from './student.service';

@Controller('student')
@UseGuards(AuthGuard())
export class StudentController {

    constructor(private readonly studentService: StudentService ){}

    @Get()
    async getStudents(@Req() req, @Res() res){
        const students = await this.studentService.getStudents();
        
        return res.status(HttpStatus.OK).json({
            message:'Students listed',
            data: students
        });
        

    }

    @Get('/:studentId')
    async getStudent(@Res() res , @Param('studentId') id ){
        const student = await this.studentService.getStudentByID(id);

        if(!student){
            throw new NotFoundException('Student does not exists');
        }

        return res.status(HttpStatus.OK).json({
            message: 'Student found',
            data: student
        });

    }

    @Post("/create")
    async createStudent(@Res() res, @Body() createStudentDTO: CreateStudentDTO){

        const student = await this.studentService.createStudent(createStudentDTO);

        return res.status(HttpStatus.CREATED).json({
            message:'Student created',
            data: student
        });
    }

    @Put('/update/:studentId')
    async updateStudent(  @Res() res, @Body() createStudentDTO: CreateStudentDTO, @Param('studentId') id){
        const student = await this.studentService.updateStudent(id, createStudentDTO);

        if(!student){
            throw new NotFoundException('Student does not exists');
        }

        return res.status(HttpStatus.OK).json({
            message: 'Student updated',
            data: student
        });
    }

    @Delete('/delete')
    async deleteStudent(@Res() res, @Query('studentId') id){
        
        const student = await this.studentService.deleteStudent(id);

        if(!student){
            throw new NotFoundException('Student does not exists');
        }

        return res.status(HttpStatus.OK).json({
            message: 'Student deleted',
            data: student
        });
    }


}