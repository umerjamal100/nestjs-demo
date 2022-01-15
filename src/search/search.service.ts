import { Injectable, Inject } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { getConnection } from 'typeorm';
import { S3 } from 'aws-sdk';

import { Store } from '../store/store.entity';
import { StoreChannel } from 'src/store-channel/store-channel.entity';
import { Review } from 'src/review/review.entity';

@Injectable()
export default class StoreSearchService {
  index = 'burger-index';

  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    @Inject('S3')
    private readonly s3: S3,
  ) {}

  async indexData(store: any) {
    const indexedResponse = await this.elasticsearchService.index<any, any>({
      index: this.index,
      body: {
        platformStoreId: store.platformStoreId,
        platformStoreName: store.platformStoreName,
      },
    });
    console.log('indexedResponse', indexedResponse);
    return indexedResponse;
  }

  async getS3Data() {
    const params = {
      Bucket: 'burgerIndex',
      Key: 'TripAdvisor-data.json',
    };

    return this.s3.getObject(params, (err, data: any) => {
      if (err) console.log('error', err, err.stack);
      // an error occurred
      console.log('data Stream>>>', data);
      if (!err) {
        var jsonData = JSON.parse(Buffer.from(data.Body).toString('utf8'));
        jsonData?.forEach((jsonObject) => {
          this.indexData(jsonObject);
          this.insertIntoDB(jsonObject);
          jsonObject?.reviews?.forEach((reviewObject) => {
            this.insertIntoReview(jsonObject, reviewObject);
          });
        });
      } // successful response
    });
  }

  async insertIntoDB(entity) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Store)
      .orIgnore()
      .values({
        locationLat: entity.location.lat,
        locationLng: entity.location.lng,
        rating: entity?.ratingsInfo?.[0]?.platformStoreRating,
        numRatings: entity?.ratingsInfo?.[0]?.reviewerCount,
        type: entity.type,
        placeId: entity.platformStoreId,
        name: entity.platformStoreName,
        address: entity.platformStoreAddress,
      })
      .execute();

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(StoreChannel)
      .orIgnore()
      .values({
        placeId: entity.platformStoreId,
        phone: entity.phoneNumberOne || entity.phoneNumberTwo,
        locationLat: entity.location.lat,
        locationLng: entity.location.lng,
        city: entity.cityName,
        priceLevel: entity.priceLevel,
        platform: entity.platform,
        platformStoreId: entity.platformStoreId,
        platformStoreName: entity.platformStoreName,
        platformStoreDescription: entity.platformStoreDescription,
        platformStoreAddress: entity.platformStoreAddress,
        platformStoreUrl: entity.platformStoreUrl,
        rating: entity?.ratingsInfo?.[0]?.platformStoreRating,
        note: entity.note,
        store: entity.platformStoreId,
      })
      .execute();
  }

  async insertIntoReview(entity, object) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .orIgnore()
      .into(Review)
      .values({
        date: object.createdAt,
        ratingValue: object.ratingValue,
        review: object.review,
        reviewerId: object.reviewerId,
        platformReviewId: object.reviewId,
        platformStoreId: entity.platformStoreId,
      })
      .execute();
  }
  s;

  async search(text: string) {
    const { body } = await this.elasticsearchService.search<any>({
      index: this.index,
      body: {
        query: {
          fuzzy: {
            platformStoreName: {
              value: text,
            },
          },
        },
      },
    });
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }

  async searchRestaurant(text: string) {
    const { body } = await this.elasticsearchService.search<any>({
      index: this.index,
      body: {
        query: {
          fuzzy: {
            platformStoreName: {
              value: text,
            },
          },
        },
      },
    });
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }
}
