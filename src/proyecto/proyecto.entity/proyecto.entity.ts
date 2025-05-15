import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EstudianteEntity } from '../../estudiante/estudiante.entity/estudiante.entity';
import { ProfesorEntity } from '../../profesor/profesor.entity/profesor.entity';
import { EvaluacionEntity } from '../../evaluacion/evaluacion.entity/evaluacion.entity';

@Entity('proyectos')
export class ProyectoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  area: string;

  @Column('int')
  presupuesto: number;

  @Column('int')
  notaFinal: number;

  @Column('int')
  estado: number;

  @Column()
  fechaInicio: string;

  @Column()
  fechaFin: string;

  @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.proyectos)
  estudiante: EstudianteEntity;

  @ManyToOne(() => ProfesorEntity, (profesor) => profesor.proyectos)
  profesor: ProfesorEntity;

  @OneToMany(() => EvaluacionEntity, (evaluacion) => evaluacion.proyecto)
  evaluaciones: EvaluacionEntity[];
}
