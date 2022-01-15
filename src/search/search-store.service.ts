import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Store } from '../store/store.entity';

import ReviewService from 'src/review/review.service';
import StoreSearchService from './search.service';

@Injectable()
export default class SearchDBStoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    private storeSearchService: StoreSearchService,
    private reviewService: ReviewService,
  ) {}

  async searchForStores(text: string) {
    const results = await this.storeSearchService.search(text);
    const ids = results.map((result) => result.platformStoreId);
    if (!ids.length) {
      return [];
    }
    return this.storeRepository.find({
      where: { placeId: In(ids) },
    });
  }

  async searchForRestaurants(id: string) {
    return this.reviewService.searchForRestaurantReview(id);
  }
}
