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
import { IProduct } from 'src/interface/IProduct';
import { Product } from 'src/model/ProductSchema';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async getProducts(): Promise<ResponseData<Product>> {
    return this.productService.findAll();
  }

  @Get('getByAccount/:account')
  async getProductsByAccount(
    @Param('account') account: string,
  ): Promise<ResponseData<Product>> {
    return this.productService.findProductsByAccount(account);
  }

  @Post('getByUri')
  async checkByTokenName(
    @Body()
    product: IProduct,
  ): Promise<ResponseData<Product>> {
    return this.productService.findProductsTokenName(product);
  }

  @Post()
  async createProduct(
    @Body()
    product: IProduct,
  ): Promise<ResponseData<Product>> {
    return this.productService.create(product);
  }

  @Post('list')
  async createListProduct(
    @Body()
    products: IProduct[],
  ): Promise<ResponseData<Product[]>> {
    return this.productService.createlist(products);
  }

  @Get(':id')
  async getProduct(
    @Param('id')
    id: string,
  ): Promise<ResponseData<Product>> {
    return this.productService.findById(id);
  }

  @Put(':id')
  async updateProducts(
    @Param('id')
    id: string,
    @Body()
    product: IProduct,
  ): Promise<ResponseData<Product>> {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  async deleteProducts(
    @Param('id')
    id: string,
  ): Promise<ResponseData<Product>> {
    return this.productService.delete(id);
  }
}
