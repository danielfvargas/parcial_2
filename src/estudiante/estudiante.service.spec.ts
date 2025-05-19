import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repo: Repository<EstudianteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        {
          provide: getRepositoryToken(EstudianteEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repo = module.get<Repository<EstudianteEntity>>(
      getRepositoryToken(EstudianteEntity),
    );
  });

  describe('crearEstudiante', () => {
    it('debería crear un estudiante válido', async () => {
      const estudiante = {
        cedula: 123,
        nombre: 'Juan',
        semestre: 6,
        programa: 'Ingeniería',
        promedio: 3.5,
      } as EstudianteEntity;

      jest.spyOn(repo, 'create').mockReturnValue(estudiante);
      jest.spyOn(repo, 'save').mockResolvedValue(estudiante);

      const result = await service.crearEstudiante(estudiante);
      expect(result).toEqual(estudiante);
    });

    it('debería lanzar error si el promedio es bajo o el semestre menor a 4', async () => {
      const estudiante = {
        cedula: 123,
        nombre: 'Juan',
        semestre: 3,
        programa: 'Ingeniería',
        promedio: 3.1,
      } as EstudianteEntity;

      await expect(service.crearEstudiante(estudiante)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
