/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsInt,
  IsString,
  Min,
  Max,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreateProyectoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  area: string;

  @IsInt()
  @IsPositive()
  presupuesto: number;

  @IsInt()
  @Min(0)
  @Max(5)
  notaFinal: number;

  @IsInt()
  @Min(0)
  @Max(4)
  estado: number;

  @IsString()
  @IsNotEmpty()
  fechaInicio: string;

  @IsString()
  @IsNotEmpty()
  fechaFin: string;
}
