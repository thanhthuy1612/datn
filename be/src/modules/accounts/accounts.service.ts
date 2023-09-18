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
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
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
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
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
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
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
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    }
  }
}
