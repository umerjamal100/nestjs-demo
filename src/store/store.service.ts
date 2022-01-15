import { Injectable } from '@nestjs/common';
import { StoreModule } from './store.module';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  findOne(id: string): Promise<Store> {
    return this.storeRepository.findOne(id);
  }
}
