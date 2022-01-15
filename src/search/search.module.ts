import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { HttpModule } from '@nestjs/axios';

import { S3 } from 'aws-sdk';

import StoreSearchService from './search.service';
import ReviewService from '../review/review.service';

import { Review } from '../review/review.entity';
import { ReviewModule } from 'src/review/review.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    ConfigModule,
    HttpModule,
    ReviewModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: 'http://localhost:9200',
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME'),
          password: configService.get('ELASTICSEARCH_PASSWORD'),
        },
      }),

      inject: [ConfigService],
    }),
  ],
  providers: [
    StoreSearchService,
    ReviewService,
    {
      provide: 'S3',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<S3> => {
        return new S3({
          accessKeyId: configService.get('AWS_ACCESS_KEY'),
          secretAccessKey: configService.get('AWS_SECRET_KEY'),
          region: 'ap-south-1',
        });
      },
    },
  ],

  exports: [ElasticsearchModule],
})
export class SearchModule {}
