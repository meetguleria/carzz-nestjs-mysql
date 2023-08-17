import { Controller, Get, Post, Body } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) {}

    @Get()
    getAllLocations() {
        return this.locationsService.getAllLocations();
    }

    @Post()
    addLocation(@Body() location: { address: string; city: string; state: string; zipCode: string }) {
        return this.locationsService.addLocation(location);
    }

}
