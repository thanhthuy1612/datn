import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { IProduct } from 'src/interface/IProduct';
import { Product } from 'src/model/ProductSchema';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productsModel: mongoose.Model<Product>,
  ) {}
  async findAll(): Promise<ResponseData<Product>> {
    try {
      const products = await this.productsModel.find();
      return new ResponseData<Product>(
        products,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  async findProductsByAccount(account: string): Promise<ResponseData<Product>> {
    try {
      const products = await this.productsModel.find({ account });
      return new ResponseData<Product>(
        products,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  async findProductsTokenName(
    product: IProduct,
  ): Promise<ResponseData<Product>> {
    try {
      const products = await this.productsModel.find({
        name: product.name,
        account: product.account,
      });
      return new ResponseData<Product>(
        products,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  async create(product: Product): Promise<ResponseData<Product>> {
    try {
      const products = await this.productsModel.create(product);
      return new ResponseData<Product>(
        products,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  async createlist(products: Product[]): Promise<ResponseData<Product[]>> {
    try {
      const result: Product[] = [];
      products.forEach((product: Product) => {
        this.productsModel.create(product).then((item) => {
          if (item) {
            result.push(item);
          }
        });
      });
      return new ResponseData<Product[]>(
        result,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  async findById(id: string): Promise<ResponseData<Product>> {
    try {
      const products = await this.productsModel.findById(id);
      return new ResponseData<Product>(
        products,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
  async update(id: string, product: Product): Promise<ResponseData<Product>> {
    try {
      const products = await this.productsModel.findByIdAndUpdate(id, product);
      return new ResponseData<Product>(
        products,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
  async delete(id: string): Promise<ResponseData<Product>> {
    try {
      const products = await this.productsModel.findByIdAndDelete(id);
      return new ResponseData<Product>(
        products,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
