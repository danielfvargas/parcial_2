import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repo: Repository<ProyectoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProyectoService,
        {
          provide: getRepositoryToken(ProyectoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repo = module.get<Repository<ProyectoEntity>>(
      getRepositoryToken(ProyectoEntity),
    );
  });

  describe('crearProyecto', () => {
    it('debería crear un proyecto válido', async () => {
      const proyecto = {
        titulo: 'Título largo suficiente',
        presupuesto: 10000,
      } as ProyectoEntity;

      jest.spyOn(repo, 'create').mockReturnValue(proyecto);
      jest.spyOn(repo, 'save').mockResolvedValue(proyecto);

      const result = await service.crearProyecto(proyecto);
      expect(result).toEqual(proyecto);
    });

    it('debería lanzar error si el presupuesto es 0', async () => {
      const proyecto = {
        titulo: 'Título largo suficiente',
        presupuesto: 0,
      } as ProyectoEntity;

      await expect(service.crearProyecto(proyecto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('avanzarEstado', () => {
    it('debería lanzar error si no encuentra el proyecto', async () => {
      jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);
      await expect(service.avanzarEstado(1)).rejects.toThrow(NotFoundException);
    });

    it('debería avanzar el estado si es válido', async () => {
      const proyecto = { id: 1, estado: 2 } as ProyectoEntity;

      jest.spyOn(repo, 'findOneBy').mockResolvedValue(proyecto);
      jest.spyOn(repo, 'save').mockResolvedValue({ ...proyecto, estado: 3 });

      const result = await service.avanzarEstado(1);
      expect(result).toBe(true);
    });
  });
});
