import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookSchema } from './schemas/book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from '../logger/logger.module'; // Import the LoggerModule

@Module({
  imports: [

    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    LoggerModule, // Include the LoggerModule here
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}