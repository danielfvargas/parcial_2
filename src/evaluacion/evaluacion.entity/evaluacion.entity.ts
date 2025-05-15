import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProyectoEntity } from '../../proyecto/proyecto.entity/proyecto.entity';
import { ProfesorEntity } from '../../profesor/profesor.entity/profesor.entity';

@Entity('evaluaciones')
export class EvaluacionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  calificacion: number;

  @ManyToOne(() => ProyectoEntity, (proyecto) => proyecto.evaluaciones)
  proyecto: ProyectoEntity;

  @ManyToOne(() => ProfesorEntity, (profesor) => profesor.evaluaciones)
  profesor: ProfesorEntity;
}
