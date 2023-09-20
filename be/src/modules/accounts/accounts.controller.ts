import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from 'src/model/AccountSchema';
import { ResponseData } from 'src/global/globalClass';
import { IAccount } from 'src/interface/IAccount';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async getAccounts(): Promise<ResponseData<Account>> {
    return this.accountsService.findAll();
  }

  @Post()
  async createAccount(
    @Body()
    account: IAccount,
  ): Promise<ResponseData<Account>> {
    return this.accountsService.create(account);
  }

  @Get(':id')
  async getAccount(
    @Param('id')
    id: string,
  ): Promise<ResponseData<Account>> {
    return this.accountsService.findById(id);
  }

  @Get('findByWallet/:wallet')
  async getAccountByWallet(
    @Param('wallet') wallet: string,
  ): Promise<ResponseData<Account>> {
    console.log(wallet);
    return this.accountsService.findByWallet(wallet);
  }

  @Put(':id')
  async updateAccounts(
    @Param('id')
    id: string,
    @Body()
    account: IAccount,
  ): Promise<ResponseData<Account>> {
    return this.accountsService.update(id, account);
  }
  @Delete(':id')
  async deleteAccounts(
    @Param('id')
    id: string,
  ): Promise<ResponseData<Account>> {
    return this.accountsService.delete(id);
  }
}
