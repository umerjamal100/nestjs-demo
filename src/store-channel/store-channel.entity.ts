import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { Review } from '../review/review.entity';
import { Store } from '../store/store.entity';
import { ObjectType, Field } from '@nestjs/graphql';

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
export class StoreChannel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: true })
  phone: string;

  @Field()
  @Column({ nullable: true })
  city: string;

  @Field()
  @Column({ nullable: true })
  priceLevel: string;

  @Field()
  @Column({ nullable: true })
  ticketPrice: number;

  @Field()
  @Column({ nullable: true })
  rating: number;

  @Field()
  @Column({ nullable: true })
  platform: PlatformType;

  @Field()
  @Column({ nullable: true })
  platformStoreId: string;

  @Field()
  @Column({ nullable: true })
  platformStoreName: string;

  @Field()
  @Column({ nullable: true, length: 10000 })
  platformStoreDescription: string;

  @Field()
  @Column({ nullable: true })
  platformStoreAddress: string;

  @Field()
  @Column({ nullable: true })
  platformStoreUrl: string;

  @Field()
  @Column({ nullable: true })
  note: string;

  @Field((type) => [Product], { nullable: true })
  @OneToMany((type) => Product, (product) => product.id)
  products: Product[];

  @Field((type) => [Review], { nullable: true })
  @OneToMany((type) => Review, (review) => review.id)
  reviews: Review[];

  @Column({ nullable: true })
  requestedToGoogleMaps: boolean;

  @Column({ nullable: true })
  locationLat: number;

  @Column({ nullable: true })
  locationLng: number;

  @Column({ nullable: true })
  placeId: string;

  @Field((type) => Store)
  @ManyToOne((type) => Store, (store) => store.storeChannels)
  store: Store;
}
