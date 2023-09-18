import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ResponseData } from 'src/global/globalClass';
import { Cart } from 'src/model/CartSchema';
import { ICart } from 'src/interface/ICart';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get()
  async getCarts(): Promise<ResponseData<Cart>> {
    return this.cartService.findAll();
  }
  @Post()
  async createCart(
    @Body()
    cart: ICart,
  ): Promise<ResponseData<Cart>> {
    return this.cartService.create(cart);
  }
  @Get(':id')
  async getCart(
    @Param('id')
    id: string,
  ): Promise<ResponseData<Cart>> {
    return this.cartService.findById(id);
  }
  @Put(':id')
  async updateCarts(
    @Param('id')
    id: string,
    @Body()
    cart: ICart,
  ): Promise<ResponseData<Cart>> {
    return this.cartService.update(id, cart);
  }
  @Delete(':id')
  async deleteCarts(
    @Param('id')
    id: string,
  ): Promise<ResponseData<Cart>> {
    return this.cartService.delete(id);
  }
}
