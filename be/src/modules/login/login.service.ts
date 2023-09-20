import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Account } from 'src/model/AccountSchema';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Account.name)
    private accountsModel: mongoose.Model<Account>,
    private readonly jwtService: JwtService,
  ) {}
  async findWallet(wallet: string): Promise<Account> {
    try {
      const accounts = await this.accountsModel.find({ wallet });
      return accounts[0];
    } catch (error) {
      return null;
    }
  }
  async create(wallet: string): Promise<Account> {
    try {
      const accounts = await this.accountsModel.create({
        wallet,
        timeJoin: new Date(),
      });
      return accounts;
    } catch (error) {
      return null;
    }
  }
  async generateTokens(payload: Account) {
    const { wallet } = payload;
    try {
      const accessToken = await this.jwtService.signAsync({ wallet });
      const refreshToken = await this.jwtService.signAsync({ wallet });
      return { accessToken, refreshToken };
    } catch (err) {
      return null;
    }
  }
}
