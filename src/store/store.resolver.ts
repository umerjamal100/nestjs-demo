import { Resolver, Args, Query } from '@nestjs/graphql';

import StoreSearchService from '../search/search.service';
import SearchDBStoreService from '../search/search-store.service';

import { Store } from './store.entity';
import { Review } from 'src/review/review.entity';

@Resolver((of) => Store)
export class StoreResolver {
  constructor(
    private storeSearchService: StoreSearchService,
    private searchDBStoreService: SearchDBStoreService,
  ) {}

  @Query((returns) => [Store])
  async store(@Args('name') searchTerm: string): Promise<Store[]> {
    const searchResult = await this.searchDBStoreService.searchForStores(
      searchTerm,
    );

    return searchResult;
  }

  @Query((returns) => [Review])
  async fetchRestaurantsOnly(@Args('id') id: string): Promise<Review[]> {
    const searchResult = await this.searchDBStoreService.searchForRestaurants(
      id,
    );

    return searchResult;
  }

  @Query((returns) => [Review])
  async parseIndexData(@Args('id') id: string): Promise<any> {
    this.storeSearchService.getS3Data();

    const searchResult = await this.searchDBStoreService.searchForRestaurants(
      id,
    );

    return searchResult;
  }
}
