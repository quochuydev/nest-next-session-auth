import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../packages/crud';
import { Cart } from './cart.entity';

@Injectable()
export class CartService extends CrudService<Cart> {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {
    super(cartRepository);
  }
}
