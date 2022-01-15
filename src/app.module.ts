import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Store } from './store/store.entity';
import { StoreChannel } from './store-channel/store-channel.entity';
import { Review } from './review/review.entity';
import { Product } from './product/product.entity';

import { StoreModule } from './store/store.module';
import { StoreChannelModule } from './store-channel/store-channel.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { SearchModule } from './search/search.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    HttpModule,
    StoreModule,
    StoreChannelModule,
    ProductModule,
    ReviewModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'burgerIndex',
      entities: [Store, StoreChannel, Review, Product],
      // synchronize: true,
    }),
    StoreModule,
    StoreChannelModule,
    ProductModule,
    ReviewModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
