import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { NotFoundExceptionFilter } from './book/404'; // Import the custom filter
import { BookModule } from './book/book.module';


@Module({
  imports: [
    
    MongooseModule.forRoot('mongodb://localhost:27017'),

    LoggerModule,
    BookModule,
  ],

  providers: [

    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter, // Register the custom filter for 404 errors
    },
  ],
})
export class AppModule {}
