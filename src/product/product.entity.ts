import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { StoreChannel } from '../store-channel/store-channel.entity';

enum PlatformType {
  Deliveroo = 'Deliveroo',
  Glovo = 'Glovo',
  Google = 'Google',
  JustEat = 'JustEat',
  Tripadvisor = 'Tripadvisor',
  TheFork = 'TheFork',
  UberEats = 'UberEats',
}

@ObjectType()
@Entity()
export class Product {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: true })
  platform: PlatformType;

  @Field()
  @Column({ nullable: true })
  platformProductId: string;

  @Field()
  @Column({ nullable: true })
  storeName: string;

  @Field()
  @Column({ nullable: true })
  category: string;

  @Field()
  @Column({ nullable: true })
  name: string;

  @Field()
  @Column({ nullable: true })
  description: string;

  @Field()
  @Column({ nullable: true })
  imageUrl: string;

  @Field()
  @Column({ nullable: true })
  currency: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column({ nullable: true })
  discountedPrice: number;

  @Field((type) => [StoreChannel], { nullable: true })
  @ManyToOne((type) => StoreChannel, (storeChannel) => storeChannel.products)
  storeChannel: StoreChannel;
}
