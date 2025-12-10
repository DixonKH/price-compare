import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PriceService } from './price.service';

@Controller('prices')
export class PriceController {
    constructor(private priceService: PriceService) {}

    @Get('product/:productId')
    getPricesByProduct(@Param('productId', ParseIntPipe) productId: number) {
        return this.priceService.getPricesByProduct(productId);
    }
}
 