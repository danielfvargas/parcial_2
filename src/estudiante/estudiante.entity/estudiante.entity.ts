import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProyectoEntity } from '../../proyecto/proyecto.entity/proyecto.entity';

@Entity('estudiantes')
export class EstudianteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  semestre: number;

  @Column()
  programa: string;

  @Column('decimal')
  promedio: number;

  @OneToMany(() => ProyectoEntity, (proyecto) => proyecto.estudiante)
  proyectos: ProyectoEntity[];
}
