import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProyectoEntity } from '../../proyecto/proyecto.entity/proyecto.entity';
import { EvaluacionEntity } from '../../evaluacion/evaluacion.entity/evaluacion.entity';

@Entity('profesores')
export class ProfesorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  departamento: string;

  @Column('int')
  extension: number;

  @Column()
  esParEvaluador: boolean;

  @OneToMany(() => ProyectoEntity, (proyecto) => proyecto.profesor)
  proyectos: ProyectoEntity[];

  @OneToMany(() => EvaluacionEntity, (evaluacion) => evaluacion.profesor)
  evaluaciones: EvaluacionEntity[];
}
