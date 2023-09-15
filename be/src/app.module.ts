import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsModule } from './modules/accounts/accounts.module';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AccountsModule,
    CartModule,
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
