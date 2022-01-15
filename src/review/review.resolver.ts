import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import ReviewService from './review.service';
import { Review } from './review.entity';

@Resolver((of) => Review)
export class ReviewResolver {
  constructor(@Inject(ReviewService) private reviewService: ReviewService) {}

  @Query((returns) => [Review])
  async storeReviews(@Args('id') id: string): Promise<Review[]> {
    const searchResult = this.reviewService.searchForReview(id);
    return searchResult;
  }
}
