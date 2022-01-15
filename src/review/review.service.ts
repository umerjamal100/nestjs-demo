import { Injectable } from '@nestjs/common';
import { Review } from './review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export default class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async searchForReview(id: string) {
    return this.reviewRepository.find({
      where: { platformStoreId: id },
      order: { date: 'ASC' },
      take: 20,
    });
  }

  async searchForRestaurantReview(id: string) {
    return this.reviewRepository.find({
      where: { platformStoreId: id },
      order: { date: 'DESC' },
      take: 20,
    });
  }
}
