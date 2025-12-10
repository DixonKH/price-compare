import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async getAllProducts() {
        return await this.prisma.product.findMany({
            include: {prices: true, category: true},
        })
    }

    async getProductById(id:number) {
        return await this.prisma.product.findUnique({
            where: {id},
            include: {prices: true, category: true},
        });
    }


}
