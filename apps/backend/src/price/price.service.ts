import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PriceService {
    constructor(
        private prisma: PrismaService
    ) {}

    async getPricesByProduct(productId: number) {
        return await this.prisma.price.findMany({
            where: {productId},
            include: {store: true}
        })
    }
}
