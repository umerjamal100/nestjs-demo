import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Review } from './review.entity';
import { ReviewResolver } from './review.resolver';
import ReviewService from './review.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewResolver, ReviewService],
  controllers: [],
})
export class ReviewModule {}
