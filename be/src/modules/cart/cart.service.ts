import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { Cart } from 'src/model/CartSchema';
@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartsModel: mongoose.Model<Cart>,
  ) {}
  async findAll(): Promise<ResponseData<Cart>> {
    try {
      const carts = await this.cartsModel.find();
      return new ResponseData<Cart>(
        carts,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Cart>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
  async create(cart: Cart): Promise<ResponseData<Cart>> {
    try {
      const carts = await this.cartsModel.create(cart);
      return new ResponseData<Cart>(
        carts,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Cart>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
  async findById(id: string): Promise<ResponseData<Cart>> {
    try {
      const carts = await this.cartsModel.findById(id);
      return new ResponseData<Cart>(
        carts,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Cart>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
  async update(id: string, cart: Cart): Promise<ResponseData<Cart>> {
    try {
      const carts = await this.cartsModel.findByIdAndUpdate(id, cart);
      return new ResponseData<Cart>(
        carts,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Cart>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
  async delete(id: string): Promise<ResponseData<Cart>> {
    try {
      const carts = await this.cartsModel.findByIdAndDelete(id);
      return new ResponseData<Cart>(
        carts,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Cart>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
}
