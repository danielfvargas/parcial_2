/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsString, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateEstudianteDto {
  @IsInt()
  @IsNotEmpty()
  cedula: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  @Min(1)
  semestre: number;

  @IsString()
  @IsNotEmpty()
  programa: string;

  @IsInt()
  @Min(0)
  @Max(5)
  promedio: number;
}
