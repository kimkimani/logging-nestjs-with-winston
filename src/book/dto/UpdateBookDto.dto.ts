import {
    IsOptional,
    IsString,
    IsNumber,
    IsEnum,
    IsEmpty,
  } from 'class-validator';
  import { Category } from '../schemas/book.schema';
  
  export class UpdateBookDto {
    @IsOptional()
    @IsString()
    title: string;
  
    @IsOptional()
    @IsString()
    description: string;
  
    @IsOptional()
    @IsString()
    author: string;
  
    @IsOptional()
    @IsNumber()
    price: number;
  
    @IsOptional()
    @IsEnum(Category, { message: 'Please enter correct category.' })
    category: Category;
  

  }