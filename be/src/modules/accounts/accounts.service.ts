import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { Account } from 'src/model/AccountSchema';
@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name)
    private accountsModel: mongoose.Model<Account>,
  ) {}
  async findAll(): Promise<ResponseData<Account>> {
    try {
      const accounts = await this.accountsModel.find();
      return new ResponseData<Account>(
        accounts,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Account>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
  async create(account: Account): Promise<ResponseData<Account>> {
    try {
      const accounts = await this.accountsModel.create(account);
      return new ResponseData<Account>(
        accounts,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Account>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
  async findById(id: string): Promise<ResponseData<Account>> {
    try {
      const accounts = await this.accountsModel.findById(id);
      return new ResponseData<Account>(
        accounts,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Account>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
  async findByWallet(wallet: string): Promise<ResponseData<Account>> {
    try {
      const accounts = await this.accountsModel.find({ wallet });
      return new ResponseData<Account>(
        accounts[0],
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Account>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
  async search(item: string): Promise<ResponseData<Account>> {
    try {
      const account = await this.accountsModel.find();
      const find = account.filter((account) => {
        return (
          (account?.username &&
            account?.username.toLowerCase().includes(item.toLowerCase())) ||
          account?.wallet.toLowerCase().includes(item.toLowerCase())
        );
      });
      return new ResponseData<Account>(
        find,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Account>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
  async update(id: string, account: Account): Promise<ResponseData<Account>> {
    try {
      const accounts = await this.accountsModel.findByIdAndUpdate(id, account);
      return new ResponseData<Account>(
        accounts,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Account>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
  async updateByWallet(
    wallet: string,
    account: Account,
  ): Promise<ResponseData<Account>> {
    try {
      await this.accountsModel.findOneAndUpdate({ wallet }, account);
      const accountNew = await this.accountsModel.find({ wallet });
      return new ResponseData<Account>(
        accountNew,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Account>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
  async delete(id: string): Promise<ResponseData<Account>> {
    try {
      const accounts = await this.accountsModel.findByIdAndDelete(id);
      return new ResponseData<Account>(
        accounts,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Account>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
