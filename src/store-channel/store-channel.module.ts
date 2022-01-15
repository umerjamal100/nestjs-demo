import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreModule } from 'src/store/store.module';
import { StoreChannel } from './store-channel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreChannel]),
    forwardRef(() => StoreModule),
  ],

  providers: [],
  controllers: [],
})
export class StoreChannelModule {}
