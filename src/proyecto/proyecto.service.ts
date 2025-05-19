import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { CreateProyectoDto } from './proyecto.dto/create-proyecto.dto';
import { EstudianteDto } from '../estudiante/estudiante.dto/estudiante.dto';
import { EstudianteEntity } from '../estudiante/estudiante.entity/estudiante.entity';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepository: Repository<ProyectoEntity>,
  ) {}

  async crearProyecto(
    createProyectoDto: CreateProyectoDto,
  ): Promise<ProyectoEntity> {
    const { presupuesto, titulo } = createProyectoDto;

    if (presupuesto <= 0) {
      throw new BadRequestException('El presupuesto debe ser mayor a 0');
    }
    if (!titulo || titulo.length <= 15) {
      throw new BadRequestException(
        'El título debe tener más de 15 caracteres',
      );
    }

    const nuevoProyecto = this.proyectoRepository.create(createProyectoDto);
    return this.proyectoRepository.save(nuevoProyecto);
  }

  async avanzarEstado(id: number): Promise<boolean> {
    const proyecto = await this.proyectoRepository.findOneBy({ id });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    if (proyecto.estado >= 4) {
      throw new BadRequestException('El proyecto ya está en su estado máximo');
    }

    proyecto.estado += 1;
    await this.proyectoRepository.save(proyecto);

    return true;
  }

  async findEstudianteByProyecto(id: number): Promise<EstudianteDto> {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id },
      relations: ['estudiante'],
    });

    if (!proyecto || !proyecto.estudiante) {
      throw new NotFoundException('Proyecto o estudiante no encontrado');
    }

    const estudiante: EstudianteEntity = proyecto.estudiante;

    return {
      id: estudiante.id,
      cedula: estudiante.cedula,
      nombre: estudiante.nombre,
      semestre: estudiante.semestre,
      programa: estudiante.programa,
      promedio: estudiante.promedio,
    };
  }

  async findAll(): Promise<ProyectoEntity[]> {
    return this.proyectoRepository.find();
  }
}
