import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Store } from './store.entity';
import { StoreChannelModule } from 'src/store-channel/store-channel.module';
import { SearchModule } from 'src/search/search.module';
import { StoreService } from './store.service';
import StoreSearchService from 'src/search/search.service';
import SearchDBStoreService from 'src/search/search-store.service';
import { StoreResolver } from './store.resolver';
import ReviewService from '../review/review.service';
import { Review } from '../review/review.entity';
import { S3 } from 'aws-sdk';

@Module({
  imports: [
    SearchModule,
    S3,
    forwardRef(() => StoreChannelModule),
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([Store]),
  ],

  providers: [
    StoreService,
    SearchDBStoreService,
    StoreSearchService,
    StoreResolver,
    ReviewService,
    ConfigService,
    {
      provide: 'S3',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<S3> => {
        return new S3({
          accessKeyId: 'AKIA5TW2Y7HIACUOSKUX',
          secretAccessKey: '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',
          region: 'ap-south-1',
        });
      },
    },
  ],
  controllers: [],
})
export class StoreModule {}
