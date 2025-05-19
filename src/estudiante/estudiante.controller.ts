import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';

@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  async crearEstudiante(
    @Body() estudiante: EstudianteEntity,
  ): Promise<EstudianteEntity> {
    return this.estudianteService.crearEstudiante(estudiante);
  }

  @Delete(':id')
  async eliminarEstudiante(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.estudianteService.eliminarEstudiante(id);
  }

  @Get()
  async findAll(): Promise<EstudianteEntity[]> {
    return this.estudianteService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EstudianteEntity> {
    return this.estudianteService.findById(id);
  }
}
