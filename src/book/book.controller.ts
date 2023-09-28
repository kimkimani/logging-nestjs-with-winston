import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/CreateBookDto.dto';
import { UpdateBookDto } from './dto/UpdateBookDto.dto';
import { LoggerService } from '../logger/logger.service';

import { Book } from './schemas/book.schema';
import { BookService } from './book.service';

import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('books')
export class BookController {
  constructor(
    private bookService: BookService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  async getBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    this.logger.log('Fetching all books', 'BookController');
    return await this.bookService.findAll(query);
  }

  @Post('new')
  async createBook(
    @Body()
    createBook: CreateBookDto,
    @Req() req,
  ): Promise<Book> {
    this.logger.log('Creating a new book', 'BookController');
    return await this.bookService.createBook(createBook);
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book> {
    this.logger.log(`Fetching book with ID ${id}`, 'BookController');

    const  book = await this.bookService.getBookById(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;


  }

  @Put(':id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    updateBook: UpdateBookDto,
  ): Promise<Book> {
    this.logger.log(`Updating Book with ID ${id}`, 'BookController');
    const updatedBook = await this.bookService.updateBookById(id, updateBook);
    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return updatedBook;
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    this.logger.log(`Deleting Book with ID ${id}`, 'BookController');
    const deleteBook = await this.bookService.deleteBookById(id);
    if (!deleteBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return deleteBook;

  }
}
