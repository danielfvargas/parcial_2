import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepository: Repository<ProyectoEntity>,
  ) {}

  async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
    const { presupuesto, titulo } = proyecto;

    if (presupuesto <= 0) {
      throw new BadRequestException('El presupuesto debe ser mayor a 0');
    }
    if (!titulo || titulo.length <= 15) {
      throw new BadRequestException(
        'El título debe tener más de 15 caracteres',
      );
    }

    const nuevoProyecto = this.proyectoRepository.create(proyecto);
    return this.proyectoRepository.save(nuevoProyecto);
  }

  async avanzarProyecto(id: number): Promise<ProyectoEntity> {
    const proyecto = await this.proyectoRepository.findOneBy({ id });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    if (proyecto.estado >= 4) {
      throw new BadRequestException('El proyecto ya está en su estado máximo');
    }

    proyecto.estado += 1;
    return this.proyectoRepository.save(proyecto);
  }

  async findAllEstudiantes(id: number) {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id },
      relations: ['estudiante'],
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    return proyecto.estudiante;
  }

  async findAll(): Promise<ProyectoEntity[]> {
    return this.proyectoRepository.find();
  }
}
