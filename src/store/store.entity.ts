import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { StoreChannel } from '../store-channel/store-channel.entity';

@ObjectType()
@Entity()
export class Store {
  @Field()
  @PrimaryColumn()
  placeId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  locationLat?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  locationLng?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  rating?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  numRatings?: number;

  @Field((type) => [StoreChannel], { nullable: true })
  @OneToMany(
    (type) => StoreChannel,
    (storeChannel) => (
      storeChannel.store,
      {
        cascadeInsert: true,
        cascadeUpdate: true,
      }
    ),
  )
  storeChannels?: StoreChannel[];
}
