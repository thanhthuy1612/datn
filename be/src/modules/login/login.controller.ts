import { Body, Controller, Post } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { ITokens } from 'src/interface/ITokens';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  async login(@Body('wallet') wallet: string): Promise<ResponseData<ITokens>> {
    const account = await this.loginService.findWallet(wallet);
    if (!account) {
      try {
        const accountCreate = await this.loginService.create(wallet);
        const tokens = await this.loginService.generateTokens(accountCreate);
        return new ResponseData<ITokens>(
          tokens,
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS,
        );
      } catch (error) {
        return new ResponseData<ITokens>(
          null,
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS,
        );
      }
    } else {
      try {
        const tokens = await this.loginService.generateTokens(account);
        return new ResponseData<ITokens>(
          tokens,
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS,
        );
      } catch (error) {
        return new ResponseData<ITokens>(
          null,
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS,
        );
      }
    }
  }
}
