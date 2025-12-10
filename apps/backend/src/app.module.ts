import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';
import { PriceModule } from './price/price.module';

@Module({
  imports: [PrismaModule, AuthModule, ProductModule, StoreModule, PriceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
