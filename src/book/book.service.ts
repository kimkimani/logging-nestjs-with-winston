import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';

import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const book = await this.bookModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return book;
  }

  async createBook(book: Book): Promise<Book> {
    const data = Object.assign(book);

    const res = await this.bookModel.create(data);
    return res;
  }

  async getBookById(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new HttpException(
        'Please enter correct id.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    return book;
  }

  async updateBookById(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  async deleteBookById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}