import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,
  ) {}

  async crearEstudiante(
    estudiante: EstudianteEntity,
  ): Promise<EstudianteEntity> {
    const { promedio, semestre } = estudiante;

    if (promedio <= 3.2) {
      throw new BadRequestException('El promedio debe ser mayor a 3.2');
    }
    if (semestre < 4) {
      throw new BadRequestException('El semestre debe ser mayor o igual a 4');
    }

    const nuevoEstudiante = this.estudianteRepository.create(estudiante);
    return this.estudianteRepository.save(nuevoEstudiante);
  }

  async eliminarEstudiante(id: number): Promise<void> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },
      relations: ['proyectos'],
    });

    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }

    const tieneProyectosActivos = estudiante.proyectos.some(
      (proyecto) => proyecto.estado !== 4,
    );

    if (tieneProyectosActivos) {
      throw new BadRequestException(
        'No se puede eliminar el estudiante porque tiene proyectos activos ',
      );
    }

    await this.estudianteRepository.delete(id);
  }

  async findAll(): Promise<EstudianteEntity[]> {
    return this.estudianteRepository.find();
  }

  async findById(id: number): Promise<EstudianteEntity> {
    const estudiante = await this.estudianteRepository.findOneBy({ id });
    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }
    return estudiante;
  }
}
