import { Body, Controller, Post } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { LoginService } from './login.service';
import { ethers } from 'ethers';
import { ILogin } from 'src/interface/ILogin';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  async login(@Body('sign') sign: string): Promise<ResponseData<ILogin>> {
    const verify = ethers.utils.verifyMessage('Login', sign);
    const account = await this.loginService.findWallet(verify);
    if (!account) {
      try {
        const accountCreate = await this.loginService.create(verify);
        const tokens = await this.loginService.generateTokens(accountCreate);
        return new ResponseData<ILogin>(
          { token: tokens, account: accountCreate },
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS,
        );
      } catch (error) {
        return new ResponseData<ILogin>(
          null,
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS,
        );
      }
    } else {
      try {
        const tokens = await this.loginService.generateTokens(account);
        return new ResponseData<ILogin>(
          { token: tokens, account: account },
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS,
        );
      } catch (error) {
        return new ResponseData<ILogin>(
          null,
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS,
        );
      }
    }
  }
}
