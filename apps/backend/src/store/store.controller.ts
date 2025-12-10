import { Controller, Get } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('stores')
export class StoreController {
    constructor(private storeService: StoreService) {}

    @Get()
    getAllStores() {
        return this.storeService.getAllStores();
    }
}
 