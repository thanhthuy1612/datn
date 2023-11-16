import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { ICart } from 'src/interface/ICart';
import { Cart } from 'src/model/CartSchema';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get()
  async getCarts(): Promise<ResponseData<Cart>> {
    return this.cartService.findAll();
  }

  @Get('getByAccount/:account')
  async getCartsByAccount(
    @Param('account') account: string,
  ): Promise<ResponseData<Cart>> {
    return this.cartService.findCartsByAccount(account);
  }

  @Post('getByUri')
  async checkByTokenUri(
    @Body()
    cart: ICart,
  ): Promise<ResponseData<Cart>> {
    return this.cartService.findCartsTokenUri(cart);
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
