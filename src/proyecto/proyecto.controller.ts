import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './proyecto.dto/create-proyecto.dto';
import { ProyectoDto } from './proyecto.dto/proyecto.dto';
import { EstudianteDto } from '../estudiante/estudiante.dto/estudiante.dto';

@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  async crearProyecto(
    @Body() createProyectoDto: CreateProyectoDto,
  ): Promise<ProyectoDto> {
    return await this.proyectoService.crearProyecto(createProyectoDto);
  }

  @Patch(':id/avanzar')
  async avanzarEstado(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return await this.proyectoService.avanzarEstado(id);
  }

  @Get(':id/estudiante')
  async findEstudianteByProyecto(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EstudianteDto> {
    return await this.proyectoService.findEstudianteByProyecto(id);
  }

  @Get()
  async findAll(): Promise<ProyectoDto[]> {
    return await this.proyectoService.findAll();
  }
}
