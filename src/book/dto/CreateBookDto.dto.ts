import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsEmpty,
} from 'class-validator';
import { Category } from '../schemas/book.schema';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter correct category.' })
  category: Category;

}