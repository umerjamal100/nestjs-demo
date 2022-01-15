import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { StoreChannel } from '../store-channel/store-channel.entity';

@ObjectType()
@Entity()
export class Review {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: true })
  date: Date;

  @Field()
  @Column({ nullable: true })
  platformReviewId: string;

  @Field()
  @Column({ nullable: true })
  ratingValue: number;

  @Field()
  @Column({ nullable: true, length: 10000 })
  review: string;

  @Field()
  @Column()
  platformStoreId: string;

  @Field()
  @Column({ nullable: true })
  reviewerId: string;

  @Field((type) => StoreChannel)
  @ManyToOne((type) => StoreChannel, (storeChannel) => storeChannel.reviews)
  storeChannel: StoreChannel;
}
